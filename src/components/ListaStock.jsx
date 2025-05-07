import { useEffect ,useState } from 'react';
import '../assets/css/Tablas.css';

function ListaStock(){
    const [productosState,setProductosState]= useState([]);
    const [cargando,setCargando]= useState(true);
    const [idEliminar,setIdEliminar]= useState('');
    const [confirmarEliminar,setConfirmarEliminar]= useState(false);
    const [idActualizar, setIdActualizar] = useState('');
    const [datosActualizar, setDatosActualizar] = useState({ nombre: '', categoria: '', stock: '' });
    const [confirmarActualizar, setConfirmarActualizar] = useState(false);  
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const [busqueda, setBusqueda] = useState(''); 
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            const productosFormateados = data.map(p => ({
                id: p.id,
                nombre: p.title,
                categoria: p.category,
                stock: p.rating.count,
                imagen: p.image
            }));
            setProductosState(productosFormateados);
            setCargando(false);
        })
        .catch(error => {
            console.error("Error al cargar los productos: ", error);
            setCargando(false);
        });
    }, []);

    const productosFiltrados= productosState.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busqueda.toLowerCase())
    );

    const confirmarActualizacion = () => {
        const id = parseInt(idActualizar);
        const nuevosProductos = productosState.map(p =>
            p.id === id
                ? { ...p, ...datosActualizar, stock: parseInt(datosActualizar.stock) }
                : p
        );
        setProductosState(nuevosProductos);
        setConfirmarActualizar(false);
        setIdActualizar('');
        setDatosActualizar({ nombre: '', categoria: '', stock: '' });
        setMostrarActualizar(false);
    };

    const cancelarActualizacion = () => {
        setConfirmarActualizar(false);
        setIdActualizar('');
        setDatosActualizar({ nombre: '', categoria: '', stock: '' });
        setMostrarActualizar(false);
    };

    const confirmarEliminacion = () => {
        const nuevosProductos = productosState.filter(p => p.id !== parseInt(idEliminar));
        setProductosState(nuevosProductos);
        setIdEliminar('');
        setConfirmarEliminar(false);
    };

    const cancelarEliminacion = () => {
        setIdEliminar('');
        setConfirmarEliminar(false);
    };

    if(cargando) return <p>Cargando Productos...</p>

    return(
        <div className='tabla-contenedor'>
            <h2>Lista de Stock</h2>
            <input 
                type='text'
                placeholder='Busca por nombre o categoria'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className='input-busqueda'
            />
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {productosFiltrados.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                            No se encontraron productos que coincidan con tu búsqueda.
                        </td>
                    </tr>
                ) : (
                productosFiltrados.map((producto) => (
                    <tr key={producto.id} onClick={() => {
                        setProductoSeleccionado(producto);
                        setMostrarModalDetalles(true);
                        }} style={{ cursor: 'pointer' }}>
                        <td>{producto.id}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.categoria}</td>
                        <td>{producto.stock}</td>
                        <td>
                            <div className='botones-acciones'>
                                <button className='btn-editar' onClick={(e) => {
                                    e.stopPropagation();
                                    setIdActualizar(producto.id);
                                    setMostrarActualizar(true);
                                    setDatosActualizar({
                                        nombre: producto.nombre,
                                        categoria: producto.categoria,
                                        stock: producto.stock
                                    });
                                }}>Editar</button>
                                <button className='btn-eliminar' onClick={(e) => {
                                    e.stopPropagation();
                                    setIdEliminar(producto.id);
                                    setConfirmarEliminar(true);
                                    setMostrarActualizar(false);
                                }}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                )))}
                </tbody>
            </table>
            {/*Seccion que muestra los detalles del producto*/}
            {mostrarModalDetalles && productoSeleccionado && (
                <>
                    <div className="modal-overlay" onClick={() => setMostrarModalDetalles(false)}></div>
                    <div className="modal-detalles">
                        <h3>Detalles del Producto</h3>
                        <img   
                            src={productoSeleccionado.imagen} 
                            alt={productoSeleccionado.nombre} 
                            className='modal-img'
                        />
                        <p><strong>ID:</strong> {productoSeleccionado.id}</p>
                        <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
                        <p><strong>Categoría:</strong> {productoSeleccionado.categoria}</p>
                        <p><strong>Stock:</strong> {productoSeleccionado.stock}</p>
                        <button onClick={() => setMostrarModalDetalles(false)} className="btn-cerrar">
                            Cerrar
                        </button>
                    </div>
                </>
            )}

            {/* Panel Actualizar */}
            {mostrarActualizar && (
                <>
                    <div className='modal-overlay'></div>
                    <div className='actualizar-panel'>
                        {idActualizar && productosState.find(p => p.id === parseInt(idActualizar)) && (
                            <div className='inputs-actualizar'>
                                <h3>Actualizar Productos</h3>
                                <input
                                    type="text"
                                    value={datosActualizar.nombre}
                                    onChange={(e) => setDatosActualizar({ ...datosActualizar, nombre: e.target.value })}
                                    placeholder="Nuevo nombre"
                                />
                                <label className='inputs-label'>Nombre Producto</label>
                                <input
                                    type="text"
                                    value={datosActualizar.categoria}
                                    onChange={(e) => setDatosActualizar({ ...datosActualizar, categoria: e.target.value })}
                                    placeholder="Nueva categoría"
                                />
                                <label className='inputs-label'>Categoria</label>
                                <input
                                    type="number"
                                    value={datosActualizar.stock}
                                    onChange={(e) => setDatosActualizar({ ...datosActualizar, stock: e.target.value })}
                                    placeholder="Nuevo stock"
                                />
                                <label className='inputs-label'>Stock</label>
                                <div className='botones-formulario'>
                                    <button onClick={() => setConfirmarActualizar(true)}>Actualizar</button>
                                    <button onClick={cancelarActualizacion} className='btn-cancelar'>Cancelar</button>
                                </div>
                            </div>
                        )}
                        {confirmarActualizar && (
                            <>
                                <div className="modal-overlay"></div>
                                <div className="mensaje-confirmacion">
                                    <p>¿Estás seguro de actualizar el producto con ID {idActualizar}?</p>
                                    <button onClick={confirmarActualizacion}className='btn-confirmar'>
                                        Confirmar
                                    </button>
                                    <button onClick={cancelarActualizacion} className='btn-cancelar'>
                                        Cancelar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

            {confirmarEliminar && (
                <>
                <div className="modal-overlay"></div>
                <div className='mensaje-confirmacion'>
                    <p>¿Estás seguro de eliminar el producto con ID {idEliminar}?</p>
                    <button onClick={confirmarEliminacion} className='btn-confirmar'>Eliminar</button>
                    <button onClick={cancelarEliminacion} className='btn-cancelar'>Cancelar</button>
                </div>
                </>
            )}
        </div>
    );
}

export default ListaStock;