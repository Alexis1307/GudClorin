import { useState } from 'react';
import ListaStock from './ListaStock';
import '../assets/css/Agregar.css';

function AgregarStock() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
    };

    const productosEjemplo = [
        { id: 1, nombre: 'Camisa', categoria: 'Ropa', stock: 10 },
        { id: 2, nombre: 'Pantalón', categoria: 'Ropa', stock: 5 },
        { id: 3, nombre: 'Zapatillas', categoria: 'Calzado', stock: 8 }
    ];

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
                            <button className="btn-agregar-producto">Agregar</button>
                            <button onClick={cerrarFormulario} className="btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <ListaStock productos={productosEjemplo} soloVisual={true} />
        </div>
    );
}

export default AgregarStock;
