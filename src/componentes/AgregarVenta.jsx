import { useState } from 'react';
import ListaVentas from './ListaVentas';
import '../assets/css/Agregar.css'; // Reutilizamos estilos

function AgregarVenta() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
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
                            <button className="btn-agregar-producto">Agregar</button>
                            <button onClick={cerrarFormulario} className="btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <ListaVentas />
        </div>
    );
}

export default AgregarVenta;
