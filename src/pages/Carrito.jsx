import React from 'react';
import { useState } from 'react';
import BarraNavegacionUsuarios from '../components/BarraNavegacionUsuarios';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; 
import '../assets/css/Carrito.css';

export default function Carrito() {
    const { carrito, eliminarDelCarrito } = useCarrito();
    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [cantidadAEliminar, setCantidadAEliminar] = useState(1);

    const irADetalle = (id) => {
        navigate(`/producto/${id}`);
    };

    const handleEliminar = () => {
        if (cantidadAEliminar <= 0 || cantidadAEliminar > productoAEliminar.cantidad) {
            alert("Cantidad no válida"); // Validar que la cantidad esté dentro del rango
            return;
        }
        eliminarDelCarrito(productoAEliminar.id, cantidadAEliminar);
        setShowConfirm(false); // Cerrar el cuadro de confirmación
    };

    const handleOpenConfirm = (producto) => {
        setProductoAEliminar(producto);
        setCantidadAEliminar(""); // Dejar el campo vacío al abrir la confirmación
        setShowConfirm(true);
    };

    const handleCantidadChange = (e) => {
        const value = e.target.value;

        // Solo permitir números positivos y vacíos
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            setCantidadAEliminar(value); // Actualiza la cantidad a eliminar
        }
    };

    return (
        <>
            <BarraNavegacionUsuarios/>
            <section className="carrito-seccion">
                <h2>Mi Carrito</h2>
                {carrito.length === 0 ? (
                    <p>Tu carrito está vacío.</p>
                ) : (
                    <div className="carrito-grid">
                        {carrito.map((producto, index) => (
                            <div 
                            key={index} 
                            className="carrito-card"
                            >
                                <div onClick={() => irADetalle(producto.id)}>
                                    <img src={producto.images[0]} alt={producto.title} />
                                    <div className="info">
                                        <h3>{producto.title}</h3>
                                        <p>Precio unitario: ${producto.price}</p>
                                        <p>Cantidad: {producto.cantidad}</p>
                                        <p>Total: ${producto.price * producto.cantidad}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleOpenConfirm(producto)}>
                                    <FaTrash className="icon" />
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {showConfirm && (
                    <div className="confirmacion-modal">
                        <div className="modal-contenido">
                            <h3>¿Cuántas unidades quieres eliminar?</h3>
                            <input
                                type="number"
                                min="1"
                                max={productoAEliminar.cantidad}
                                value={cantidadAEliminar}
                                onChange={handleCantidadChange}
                                placeholder="Escribe cantidad"
                            />
                            <div className="modal-botones">
                                <button onClick={() => setShowConfirm(false)}>Cancelar</button>
                                <button onClick={handleEliminar}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
