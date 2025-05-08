import React, { useState, useEffect } from 'react';
import '../assets/css/VistaProducto.css';
import { FaHeart, FaCartPlus, FaShareAlt, FaCheckCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

function VistaProducto() {
    const [producto, setProducto] = useState(null);
    const [favorito, setFavorito] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [contadorCarrito, setContadorCarrito] = useState(0);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();

    // Obtener producto desde la API usando el id
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProducto(data))
            .catch(err => console.error('Error al obtener producto:', err));
    }, [id]);

    if (!producto) {
        return <p>Cargando producto...</p>;
    }

    const agregarFavorito = () => {
        setFavorito(!favorito);
        setMensaje(favorito ? 'Quitado de favoritos' : 'Agregado a favoritos');
        ocultarMensaje();
    };

    const agregarCarrito = () => {
        setMensaje('Agregado al carrito');
        setContadorCarrito(prev => prev + 1);
        ocultarMensaje();
    };

    const compartir = () => {
        setMensaje('¡Producto compartido!');
        ocultarMensaje();
    };

    const ocultarMensaje = () => {
        setTimeout(() => setMensaje(''), 2000);
    };

    return (
        <div className="vista-producto">
            <button className="btn-atras" onClick={() => navigate('/usuarios')}>
                ← Volver
            </button>
            <div className="imagen-grande">
                <img src={producto.images[imagenSeleccionada]} alt={producto.title} />
                <div className="iconos-detalle">
                    <button onClick={agregarFavorito} className="icono-btn">
                        <FaHeart color={favorito ? 'red' : 'gray'} />
                    </button>
                    <button onClick={agregarCarrito} className="icono-btn">
                        <FaCartPlus />
                        {contadorCarrito > 0 && <span className="contador">{contadorCarrito}</span>}
                    </button>
                    <button onClick={compartir} className="icono-btn">
                        <FaShareAlt />
                    </button>
                </div>
                {mensaje && <div className="mensaje-popup"><FaCheckCircle /> {mensaje}</div>}
                <div className="etiquetas">
                    <span className="etiqueta nueva">Nuevo</span>
                    <span className="etiqueta oferta">{producto.discountPercentage}% OFF</span>
                </div>
            </div>

            <div className="detalle-info">
                <h2>{producto.title}</h2>
                <p>{producto.description}</p>
                <p className="precio">
                    <span className="precio-original">${producto.price}</span>
                    <span className="precio-descuento">
                        ${(producto.price * (1 - producto.discountPercentage / 100)).toFixed(2)}
                    </span>
                </p>
                <button className="btn-comprar">Comprar ahora</button>

                <div className="productos-relacionados">
                    <h4>Productos relacionados</h4>
                    <div className="relacionados-contenedor">
                        {producto.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Vista ${i}`}
                                onClick={() => setImagenSeleccionada(i)}
                                className={i === imagenSeleccionada ? 'miniatura-activa' : ''}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VistaProducto;
