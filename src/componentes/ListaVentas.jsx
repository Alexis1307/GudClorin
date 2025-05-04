import { useEffect, useState } from 'react';
import '../assets/css/Tablas.css';

function ListaVentas(){
    const [ventas, setVentas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [idEliminar, setIdEliminar] = useState(null);
    const [confirmarEliminar, setConfirmarEliminar] = useState(false);
    const [productoFiltro, setProductoFiltro] = useState('');
    const [fechaFiltro, setFechaFiltro] = useState('');
    const [idFiltro, setIdFiltro] = useState('');
    const [mostrarModalNoEncontrado, setMostrarModalNoEncontrado] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const ventasPorPagina = 20;

    function getFechaAleatoria() {
        const diasAtras = Math.floor(Math.random() * 15); // entre 0 y 14 días atrás
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - diasAtras);
        return fecha.toISOString().split('T')[0];
    }

    useEffect(() => {
        fetch('https://dummyjson.com/carts')
            .then(res => res.json())
            .then(data => {
                let idGlobal = 1000;
                const ventasProcesadas = data.carts.flatMap(cart =>
                    cart.products.map(producto => ({
                        id: idGlobal++, // ID único
                        producto: producto.title || '',
                        fecha: getFechaAleatoria(),
                        cantidad: producto.quantity || 0,
                        total: producto.total || 0
                    }))
                );
                setVentas(ventasProcesadas);
                setCargando(false);
            })
            .catch(error => {
                console.error('Error al cargar ventas:', error);
                setCargando(false);
            });
    }, []);

    const pedirConfirmacionEliminar = (id) => {
        setIdEliminar(id);
        setConfirmarEliminar(true);
    };

    const confirmarEliminacion = () => {
        const nuevasVentas = ventas.filter(v => v.id !== idEliminar);
        setVentas(nuevasVentas);
        setIdEliminar(null);
        setConfirmarEliminar(false);
    };

    const cancelarEliminacion = () => {
        setIdEliminar(null);
        setConfirmarEliminar(false);
    };

    const ventasFiltradas = ventas
        .filter(v => idFiltro === '' || v.id.toString().includes(idFiltro.toLowerCase()))
        .filter(v => productoFiltro === '' || v.producto.toLowerCase().includes(productoFiltro.toLowerCase()))
        .filter(v => fechaFiltro === '' || v.fecha === fechaFiltro);

    const totalPaginas = Math.ceil(ventasFiltradas.length / ventasPorPagina);
    const indiceInicio = (paginaActual - 1) * ventasPorPagina;
    const indiceFin = indiceInicio + ventasPorPagina;
    const ventasPaginadas = ventasFiltradas.slice(indiceInicio, indiceFin);
    
    const irPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };
    
    const irPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };
    
    // Reiniciar página si cambian los filtros
    useEffect(() => {
        setPaginaActual(1);
    }, [productoFiltro, fechaFiltro, idFiltro]);

    // Control del modal de "no encontrado"
    useEffect(() => {
        if (!cargando && ventasFiltradas.length === 0) {
            setMostrarModalNoEncontrado(true);
        } else {
            setMostrarModalNoEncontrado(false);
        }
    }, [ventasFiltradas, cargando]);

    const cerrarModalYLimpiarFiltros = () => {
        setProductoFiltro('');
        setFechaFiltro('');
        setIdFiltro('');
        setMostrarModalNoEncontrado(false);
    };

    useEffect(() => {
        setPaginaActual(1);
    }, [productoFiltro, fechaFiltro, idFiltro]);

    if (cargando) return <p>Cargando ventas...</p>;

    return(
        <div className='tabla-contenedor'>
            <h2>Lista de Ventas</h2>
            <div className="botones-acciones">
                <input
                    type="number"
                    placeholder="Filtrar por ID"
                    value={idFiltro}
                    onChange={(e) => setIdFiltro(e.target.value)}
                    className='input-busqueda'
                />
                <input
                    type="text"
                    placeholder="Filtrar por producto"
                    value={productoFiltro}
                    onChange={(e) => setProductoFiltro(e.target.value)}
                    className='input-busqueda'
                />
                <input
                    type="date"
                    value={fechaFiltro}
                    onChange={(e) => setFechaFiltro(e.target.value)}
                    className='input-busqueda'
                />
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {ventasPaginadas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.id}</td>
                            <td>{venta.producto}</td>
                            <td>{venta.fecha}</td>
                            <td>{venta.cantidad}</td>
                            <td>S/ {venta.total.toFixed(2)}</td>
                            <td>
                                <button className='btn-eliminar' onClick={() => pedirConfirmacionEliminar(venta.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            {ventasFiltradas.length > ventasPorPagina && (
                <div className="paginacion">
                    <button onClick={irPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
                    <span>Página {paginaActual} de {totalPaginas}</span>
                    <button onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas}>Siguiente</button>
                </div>
            )}
            {confirmarEliminar && (
                <>
                    <div className='modal-overlay'></div>
                    <div className='mensaje-confirmacion'>
                        <p>¿Estás seguro de eliminar esta venta?</p>
                        <button className='btn-confirmar' onClick={confirmarEliminacion}>Sí, eliminar</button>
                        <button className='btn-cancelar' onClick={cancelarEliminacion}>Cancelar</button>
                    </div>
                </>
            )}
            {/* Modal si no hay coincidencias */}
            {mostrarModalNoEncontrado && (
                <>
                    <div className="modal-overlay" onClick={cerrarModalYLimpiarFiltros}></div>
                    <div className="modal-detalles">
                        <h3>No se encontraron ventas</h3>
                        <p>Intenta cambiar los filtros o borrarlos.</p>
                        <button onClick={cerrarModalYLimpiarFiltros} className="btn-cerrar">
                            Cerrar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ListaVentas