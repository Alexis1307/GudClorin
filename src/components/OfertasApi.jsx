import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useFavoritos } from '../context/FavoritosContext';
import { useCarrito } from '../context/CarritoContext';
import '../assets/css/OfertasApi.css';

function TarjetaProducto({ producto, pausarCarrusel, reanudarCarrusel }) {
    const [imagenActual, setImagenActual] = useState(0);
    const [hovering, setHovering] = useState(false);
    const navigate = useNavigate();
    const { favoritos, toggleFavorito } = useFavoritos();
    const esFavorito = favoritos.some((fav) => fav.id === producto.id);
    const { agregarAlCarrito, estaEnCarrito} = useCarrito(); // Usamos el contexto de carrito
    

    useEffect(() => {
        let intervalo;
    
        if (hovering) {
            setImagenActual(1);
            intervalo = setInterval(() => {
                setImagenActual(prev => (prev + 1) % producto.images.length);
            }, 1000);
        } else {
            setImagenActual(0);
        }
    
        return () => clearInterval(intervalo);
    }, [hovering, producto.images.length]);

    const handleClick = () => {
        navigate(`/producto/${producto.id}`);
    };

    const handleFavorito = (e) => {
        e.stopPropagation(); // Evita que el click afecte el evento de redirección
        toggleFavorito(producto);    
    };

    // Verificamos si el producto está en el carrito
    const estaEnElCarrito = estaEnCarrito(producto.id);

    return (
        <div
            className="oferta-card"
            onMouseEnter={() => {
                setHovering(true);
                pausarCarrusel();
            }}
            onMouseLeave={() => {
                setHovering(false);
                reanudarCarrusel();
            }}
            onClick={handleClick}
        >
            <div className="imagen-cambio">
                {producto.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`${producto.title} vista ${idx}`}
                        className={idx === imagenActual ? 'visible' : 'oculto'}
                    />
                ))}

                {/* Iconos flotantes dentro del contenedor de imagen */}
                <div className="iconos-flotantes">
                    <button
                        className={`btn-favorito ${esFavorito ? 'activo' : ''}`}
                        onClick={handleFavorito}
                        title="Agregar a favoritos"
                    >
                        {esFavorito ? '❤️' : '♡'}
                    </button>
                    <button
                        className={`btn-carrito ${estaEnElCarrito ? 'activo' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation(); // evita redirección si el botón está dentro de una tarjeta clickeable
                            agregarAlCarrito(producto); // esta función viene del context
                        }}
                    >
                        🛒
                    </button>
                </div>
            </div>

            {/* Información del producto debajo de la imagen */}
            <h3>{producto.title}</h3>
            <p>
                <span className="precio-antes">${producto.price}</span>{' '}
                <span className="precio-ahora">
                    ${(producto.price * (1 - producto.discountPercentage / 100)).toFixed(2)}
                </span>
            </p>
        </div>
    );
}

function OfertasApi() {
    const [productos, setProductos] = useState([]);
    const [carruselActivo, setCarruselActivo] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/products/category/mens-shirts')
            .then(res => res.json())
            .then(data => setProductos([...data.products.slice(0, 5), ...data.products.slice(0, 5)]))
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);

    const pausarCarrusel = () => setCarruselActivo(false);
    const reanudarCarrusel = () => setCarruselActivo(true);

    return (
        <section className="seccion-ofertas">
            <h2>Ofertas Especiales</h2>
            <div className="carrusel-contenedor">
                <div className={`carrusel ${carruselActivo ? 'activo' : 'pausado'}`}>
                    {productos.map((producto, index) => (
                        <TarjetaProducto
                            key={producto.id + '-' + index}
                            producto={producto}
                            pausarCarrusel={pausarCarrusel}
                            reanudarCarrusel={reanudarCarrusel}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OfertasApi;