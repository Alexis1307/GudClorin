import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/PanelOpciones.css';

function PanelOpciones({ setVista, cerrarMenu }){
    const navigate = useNavigate();
    const [mostarConfirmacion,setMostarConfirmacion] = useState(false);

    const manejarVista = (vista) => {
        setVista(vista);
        if (cerrarMenu) cerrarMenu(); // cerrar si se usa en modo responsivo
    };

    const confirmarCerrarSesion= () => {
        navigate('/');
    }

    const cancelarCerrarSesion= () => {
        setMostarConfirmacion(false);
    }


    return(
        <div className='menu-lateral'>
            <h3>Opciones</h3>
            <button onClick={() => manejarVista('stock')}>Stock</button>
            <button onClick={() => manejarVista('agregarStock')}>Agregar Stock</button>
            <button onClick={() => manejarVista('ventas')}>Ventas</button>
            <button onClick={() => manejarVista('agregarVenta')}>Agregar Venta</button>
            <button onClick={() => manejarVista('clientes')}>Clientes</button>
            <button onClick={() => manejarVista('agregarCliente')}>Agregar Cliente</button>
            <div className="cerrar-sesion">
                <button onClick={() => setMostarConfirmacion(true)}>Cerrar Sesion</button>
            </div>
            {mostarConfirmacion && (
                <>
                    <div className="modal-overlay"></div>
                    <div className="mensaje-confirmacion">
                        <p>¿Estás seguro de que deseas cerrar sesión?</p>
                        <button onClick={confirmarCerrarSesion} className='btn-confirmar'>
                            Confirmar
                        </button>
                        <button onClick={cancelarCerrarSesion} className='btn-cancelar'>
                            Cancelar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default PanelOpciones