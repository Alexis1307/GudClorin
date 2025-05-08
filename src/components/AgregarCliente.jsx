import { useState } from 'react';
import ListaClientes from '../components/ListaCliente';
import '../assets/css/Agregar.css';

function AgregarCliente() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mensajeExito, setMensajeExito] = useState(false);

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
    };

    const manejarAgregar = () => {
        // Mostrar mensaje flotante
        setMensajeExito(true);

        // Ocultar mensaje y cerrar modal después de 2 segundos
        setTimeout(() => {
            setMensajeExito(false);
            cerrarFormulario();
        }, 2000);
    };

    return (
        <div className="contenedor-agregar-stock">
            <h2 className="titulo-gestionar">Gestionar Clientes</h2>
            <button 
                onClick={() => setMostrarFormulario(true)} 
                className="btn-agregar-producto"
            >
                Agregar Cliente
            </button>

            {mensajeExito && (
                <div className="mensaje-exito">Cliente agregado con éxito</div>
            )}

            {mostrarFormulario && (
                <div className="modal-formulario">
                    <div className="formulario-agregar">
                        <h3>Agregar Cliente</h3>
                        <input type="text" placeholder="Nombre" />
                        <input type="text" placeholder="Dirección" />
                        <input type="email" placeholder="Correo" />
                        <input type="text" placeholder="Teléfono" />
                        <div className="botones-modal">
                            <button onClick={manejarAgregar} className="btn-agregar-producto">Agregar</button>
                            <button onClick={cerrarFormulario} className="btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <ListaClientes soloVisual={true} />
        </div>
    );
}

export default AgregarCliente;
