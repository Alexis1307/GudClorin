import { useState } from 'react';
import ListaVentas from './ListaVentas';
import '../assets/css/Agregar.css'; // Reutilizamos estilos

function AgregarVenta() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
    };

    const manejarAgregar = () => {
        // Aquí podrías guardar la venta en tu estado o base de datos si lo deseas
        setMostrarMensaje(true);
        setTimeout(() => setMostrarMensaje(false), 2000); // Oculta el mensaje después de 2 segundos
        cerrarFormulario(); // Cierra el formulario
    };

    return (
        <div className="contenedor-agregar-stock">
            <h2 className="titulo-gestionar">Gestionar Ventas</h2>

            <button 
                onClick={() => setMostrarFormulario(true)} 
                className="btn-agregar-producto"
            >
                Agregar Venta
            </button>

            {mostrarFormulario && (
                <div className="modal-formulario">
                    <div className="formulario-agregar">
                        <h3>Agregar Venta</h3>
                        <input type="number" placeholder="ID de Producto" />
                        <input type="text" placeholder="Nombre del Producto" />
                        <input type="text" placeholder="Categoría" />
                        <input type="number" placeholder="Cantidad Vendida" />
                        <input type="number" placeholder="Total (S/.)" />
                        <div className="botones-modal">
                            <button onClick={manejarAgregar} className="btn-agregar-producto">Agregar</button>
                            <button onClick={cerrarFormulario} className="btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {mostrarMensaje && (
                <div className="mensaje-exito">Venta registrada con éxito</div>
            )}

            <ListaVentas />
        </div>
    );
}

export default AgregarVenta;
