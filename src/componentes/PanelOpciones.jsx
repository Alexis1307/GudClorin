import '../assets/css/PanelOpciones.css';

function PanelOpciones({ setVista, cerrarMenu }){
    const manejarVista = (vista) => {
        setVista(vista);
        if (cerrarMenu) cerrarMenu(); // cerrar si se usa en modo responsivo
    };
    return(
        <div className='menu-lateral'>
            <h3>Opciones</h3>
            <button onClick={() => manejarVista('stock')}>Stock</button>
            <button onClick={() => manejarVista('ventas')}>Ventas</button>
            <button onClick={() => manejarVista('agregarStock')}>Agregar Stock</button>
            <button onClick={() => manejarVista('agregarVenta')}>Agregar Venta</button>
            <div className="cerrar-sesion">
                <button onClick={() => alert("Sesión cerrada")}>Cerrar Sesión</button>
            </div>
        </div>
    );
}

export default PanelOpciones