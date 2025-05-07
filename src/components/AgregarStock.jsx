import { useState } from 'react';
import ListaStock from './ListaStock';
import '../assets/css/Agregar.css';

function AgregarStock() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
    };

    const manejarAgregar = () => {
        // Aquí podrías agregar lógica para guardar el producto si lo necesitas
        setMostrarMensaje(true);
        setTimeout(() => setMostrarMensaje(false), 2000); // Oculta el mensaje luego de 2 segundos
        cerrarFormulario(); // También cerramos el formulario
    };

    return (
        <div className="contenedor-agregar-stock">
            <h2 className="titulo-gestionar">Gestionar Productos</h2>

            <button 
                onClick={() => setMostrarFormulario(true)} 
                className="btn-agregar-producto"
            >
                Agregar Producto
            </button>

            {mostrarFormulario && (
                <div className="modal-formulario">
                    <div className="formulario-agregar">
                        <h3>Agregar Producto</h3>
                        <input type="number" placeholder="ID" />
                        <input type="text" placeholder="Nombre" />
                        <input type="text" placeholder="Categoría" />
                        <input type="number" placeholder="Stock" />
                        <div className="botones-modal">
                            <button onClick={manejarAgregar} className="btn-agregar-producto">Agregar</button>
                            <button onClick={cerrarFormulario} className="btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {mostrarMensaje && (
                <div className="mensaje-exito">Producto agregado con éxito</div>
            )}

            <ListaStock />
        </div>
    );
}

export default AgregarStock;
