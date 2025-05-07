import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
    const [mostrarBoleta, setMostrarBoleta] = useState(false);
    
    const ventasPorPagina = 10;

    function getFechaAleatoria() {
        const diasAtras = Math.floor(Math.random() * 15); // entre 0 y 14 días atrás
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - diasAtras);
        return fecha.toISOString().split('T')[0];
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resCarts, resUsers] = await Promise.all([
                    fetch('https://dummyjson.com/carts').then(res => res.json()),
                    fetch('https://dummyjson.com/users?limit=100').then(res => res.json())
                ]);                
    
                let idGlobal = 1000;
                const ventasProcesadas = resCarts.carts.map(cart => {
                    const cliente = resUsers.users.find(user => user.id === cart.userId);
                
                    return {
                        id: idGlobal++,
                        fecha: getFechaAleatoria(),
                        cliente: cliente ? {
                            nombre: `${cliente.firstName} ${cliente.lastName}`,
                            correo: cliente.email,
                            direccion: `${cliente.address.address}, ${cliente.address.city}`,
                            telefono: cliente.phone,
                        } : {
                            nombre: 'Cliente desconocido',
                            correo: 'N/A',
                            direccion: 'N/A',
                            telefono: 'N/A',
                        },
                        productos: cart.products.map(producto => ({
                            nombre: producto.title,
                            cantidad: producto.quantity,
                            precio: producto.price,
                            total: producto.total
                        })),
                        total: cart.total
                    };
                });
                
                setVentas(ventasProcesadas);
                console.log("Ventas cargadas:", ventasProcesadas);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setCargando(false);
            }
        };    
        fetchData();
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
        .filter(v => 
            productoFiltro === '' || 
            v.productos.some(p => p.nombre.toLowerCase().includes(productoFiltro.toLowerCase()))
        )
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
        if (!cargando && ventas.length > 0 && ventasFiltradas.length === 0) {
            setMostrarModalNoEncontrado(true);
        } else {
            setMostrarModalNoEncontrado(false);
        }
    }, [ventasFiltradas, cargando, ventas]);

    const cerrarModalYLimpiarFiltros = () => {
        setProductoFiltro('');
        setFechaFiltro('');
        setIdFiltro('');
        setMostrarModalNoEncontrado(false);
    };

    useEffect(() => {
        setPaginaActual(1);
    }, [productoFiltro, fechaFiltro, idFiltro]);

    const abrirModalBoleta = (venta) => {
        setVentaSeleccionada(venta);
        setMostrarBoleta(true);
    };
    
    const cerrarModalBoleta = () => {
        setVentaSeleccionada(null);
        setMostrarBoleta(false);
    };

    if (cargando) return <p>Cargando ventas...</p>;

    const generarPDF = (venta) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Boleta de Venta', 14, 20);
    
        doc.setFontSize(12);
        doc.text(`ID: ${venta.id}`, 14, 30);
        doc.text(`Fecha: ${venta.fecha}`, 14, 36);
    
        doc.text('Cliente:', 14, 46);
        doc.text(`Nombre: ${venta.cliente.nombre}`, 14, 52);
        doc.text(`Correo: ${venta.cliente.correo}`, 14, 58);
        doc.text(`Dirección: ${venta.cliente.direccion}`, 14, 64);
        doc.text(`Teléfono: ${venta.cliente.telefono}`, 14, 70);
    
        // Tabla de productos
        autoTable(doc, {
            startY: 80,
            head: [['Producto', 'Cantidad', 'Precio Unitario', 'Total']],
            body: venta.productos.map(p => [
                p.nombre,
                p.cantidad,
                `S/ ${p.precio.toFixed(2)}`,
                `S/ ${p.total.toFixed(2)}`
            ])
        });
    
        // Total final
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.text(`Total: S/ ${venta.total.toFixed(2)}`, 14, finalY);
    
        doc.save(`boleta_venta_${venta.id}.pdf`);
    };

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
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {ventasPaginadas.map((venta) => (
                    <tr key={venta.id} onClick={() => abrirModalBoleta(venta)} style={{ cursor: 'pointer' }}>
                        <td>{venta.id}</td>
                        <td>{venta.cliente.nombre}</td>
                        <td>{venta.productos[0]?.nombre || 'Sin productos'}</td>
                        <td>{venta.fecha}</td>
                        <td>S/ {venta.total.toFixed(2)}</td>
                        <td>
                            <button className='btn-eliminar' onClick={(e) => { e.stopPropagation(); pedirConfirmacionEliminar(venta.id); }}>
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
            {mostrarBoleta && ventaSeleccionada && (
                <>
                    <div className="modal-overlay" onClick={() => setMostrarBoleta(false)}></div>
                    <div className="modal-boleta">
                        <div className="boleta-contenido">
                            <h2>Boleta de Venta</h2>
                            <hr />
                            <p><strong>ID:</strong> {ventaSeleccionada.id}</p>
                            <p><strong>Fecha:</strong> {ventaSeleccionada.fecha}</p>
                            <h4>Cliente</h4>
                            <p><strong>Nombre:</strong> {ventaSeleccionada.cliente.nombre}</p>
                            <p><strong>Correo:</strong> {ventaSeleccionada.cliente.correo}</p>
                            <p><strong>Dirección:</strong> {ventaSeleccionada.cliente.direccion}</p>
                            <p><strong>Teléfono:</strong> {ventaSeleccionada.cliente.telefono}</p>
                            <hr />
                            <table className="boleta-tabla">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unitario</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ventaSeleccionada.productos.map((p, i) => (
                                        <tr key={i}>
                                            <td>{p.nombre}</td>
                                            <td>{p.cantidad}</td>
                                            <td>S/ {p.precio.toFixed(2)}</td>
                                            <td>S/ {p.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <hr />
                            <p style={{ textAlign: 'right' }}>
                                <strong>Total: S/ {ventaSeleccionada.total.toFixed(2)}</strong>
                            </p>
                            <button onClick={cerrarModalBoleta} className="btn-cerrar">
                                Cerrar
                            </button>
                            <button onClick={() => generarPDF(ventaSeleccionada)} className="btn-descargar">
                                Descargar PDF
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ListaVentas