import { useEffect, useState } from 'react';
import '../assets/css/Tablas.css';

function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);

    const [idActualizar, setIdActualizar] = useState('');
    const [datosActualizar, setDatosActualizar] = useState({ nombre: '', apellido: '', edad: '', celular: '' });
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const [confirmarActualizar, setConfirmarActualizar] = useState(false);

    const [idEliminar, setIdEliminar] = useState('');
    const [confirmarEliminar, setConfirmarEliminar] = useState(false);

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=30')
            .then(res => res.json())
            .then(data => {
                const clientesFormateados = data.users.map(user => ({
                    id: user.id,
                    nombre: user.firstName,
                    apellido: user.lastName,
                    edad: user.age,
                    celular: user.phone,
                    productos: [] 
                }));
                setClientes(clientesFormateados);
                setCargando(false);

                // Ahora traemos los carritos
                fetch('https://dummyjson.com/carts')
                    .then(res => res.json())
                    .then(cartsData => {
                        const clientesConCompras = clientesFormateados.map(cliente => {
                            const carrito = cartsData.carts.find(c => c.userId === cliente.id);
                            return {
                                ...cliente,
                                productos: carrito ? carrito.products.map(p => ({
                                    nombre: p.title,
                                    cantidad: p.quantity,
                                    precio: p.price
                                })) : []
                            };
                        });
                        setClientes(clientesConCompras);
                    });
            });
    }, []);

    const clientesFiltrados = clientes.filter(c =>
        `${c.nombre} ${c.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.celular.toLowerCase().includes(busqueda.toLowerCase())
    );

    const confirmarActualizacion = () => {
        const nuevosClientes = clientes.map(c =>
            c.id === parseInt(idActualizar)
                ? { ...c, ...datosActualizar }
                : c
        );
        setClientes(nuevosClientes);
        setConfirmarActualizar(false);
        setMostrarActualizar(false);
        setIdActualizar('');
        setDatosActualizar({ nombre: '', apellido: '', edad: '', celular: '' });
    };

    const cancelarActualizacion = () => {
        setConfirmarActualizar(false);
        setMostrarActualizar(false);
        setIdActualizar('');
        setDatosActualizar({ nombre: '', apellido: '', edad: '', celular: '' });
    };

    const confirmarEliminacion = () => {
        const nuevosClientes = clientes.filter(c => c.id !== parseInt(idEliminar));
        setClientes(nuevosClientes);
        setIdEliminar('');
        setConfirmarEliminar(false);
    };

    const cancelarEliminacion = () => {
        setIdEliminar('');
        setConfirmarEliminar(false);
    };

    if (cargando) return <p>Cargando Clientes...</p>;

    return (
        <div className='tabla-contenedor'>
            <h2>Lista de Clientes</h2>
            <input
                type='text'
                placeholder='Busca por nombre o celular'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className='input-busqueda'
            />
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre completo</th>
                        <th>Edad</th>
                        <th>Celular</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesFiltrados.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                                No se encontraron clientes que coincidan con tu búsqueda.
                            </td>
                        </tr>
                    ) : (
                        clientesFiltrados.map(cliente => (
                            <tr
                                key={cliente.id}
                                onClick={() => {
                                    setClienteSeleccionado(cliente);
                                    setMostrarModalDetalles(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{cliente.id}</td>
                                <td>{cliente.nombre} {cliente.apellido}</td>
                                <td>{cliente.edad}</td>
                                <td>{cliente.celular}</td>
                                <td>
                                    <div className='botones-acciones'>
                                        <button
                                            className='btn-editar'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIdActualizar(cliente.id);
                                                setDatosActualizar({
                                                    nombre: cliente.nombre,
                                                    apellido: cliente.apellido,
                                                    edad: cliente.edad,
                                                    celular: cliente.celular
                                                });
                                                setMostrarActualizar(true);
                                            }}
                                        >Editar</button>
                                        <button
                                            className='btn-eliminar'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIdEliminar(cliente.id);
                                                setConfirmarEliminar(true);
                                            }}
                                        >Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {mostrarModalDetalles && clienteSeleccionado && (
                <>
                    <div className="modal-overlay" onClick={() => setMostrarModalDetalles(false)}></div>
                    <div className="modal-detalles">
                        <h3>Detalles del Cliente</h3>
                        <p><strong>ID:</strong> {clienteSeleccionado.id}</p>
                        <p><strong>Nombre:</strong> {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}</p>
                        <p><strong>Edad:</strong> {clienteSeleccionado.edad}</p>
                        <p><strong>Celular:</strong> {clienteSeleccionado.celular}</p>
                        <h4>Productos Comprados:</h4>
                        <ul>
                            {clienteSeleccionado.productos.length === 0 ? (
                                <li>No ha comprado productos.</li>
                            ) : (
                                clienteSeleccionado.productos.map((prod, idx) => (
                                    <li key={idx}>{prod.nombre} (x{prod.cantidad}) - ${prod.precio}</li>
                                ))
                            )}
                        </ul>
                        <button onClick={() => setMostrarModalDetalles(false)} className="btn-cerrar">
                            Cerrar
                        </button>
                    </div>
                </>
            )}

            {mostrarActualizar && (
                <>
                    <div className='modal-overlay'></div>
                    <div className='actualizar-panel'>
                        <div className='inputs-actualizar'>
                            <h3>Actualizar Cliente</h3>
                            <input
                                type="text"
                                value={datosActualizar.nombre}
                                onChange={(e) => setDatosActualizar({ ...datosActualizar, nombre: e.target.value })}
                                placeholder="Nombre"
                            />
                            <label className='inputs-label'>Nombre</label>
                            <input
                                type="text"
                                value={datosActualizar.apellido}
                                onChange={(e) => setDatosActualizar({ ...datosActualizar, apellido: e.target.value })}
                                placeholder="Apellido"
                            />
                            <label className='inputs-label'>Apellido</label>
                            <input
                                type="number"
                                value={datosActualizar.edad}
                                onChange={(e) => setDatosActualizar({ ...datosActualizar, edad: e.target.value })}
                                placeholder="Edad"
                            />
                            <label className='inputs-label'>Edad</label>
                            <input
                                type="text"
                                value={datosActualizar.celular}
                                onChange={(e) => setDatosActualizar({ ...datosActualizar, celular: e.target.value })}
                                placeholder="Celular"
                            />
                            <label className='inputs-label'>Celular</label>
                            <div className='botones-formulario'>
                                <button onClick={() => setConfirmarActualizar(true)}>Actualizar</button>
                                <button onClick={cancelarActualizacion} className='btn-cancelar'>Cancelar</button>
                            </div>
                        </div>
                    </div>
                    {confirmarActualizar && (
                        <>
                            <div className="modal-overlay"></div>
                            <div className="mensaje-confirmacion">
                                <p>¿Estás seguro de actualizar al cliente con ID {idActualizar}?</p>
                                <button onClick={confirmarActualizacion} className='btn-confirmar'>Confirmar</button>
                                <button onClick={cancelarActualizacion} className='btn-cancelar'>Cancelar</button>
                            </div>
                        </>
                    )}
                </>
            )}

            {confirmarEliminar && (
                <>
                    <div className="modal-overlay"></div>
                    <div className='mensaje-confirmacion'>
                        <p>¿Estás seguro de eliminar al cliente con ID {idEliminar}?</p>
                        <button onClick={confirmarEliminacion} className='btn-confirmar'>Eliminar</button>
                        <button onClick={cancelarEliminacion} className='btn-cancelar'>Cancelar</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ListaClientes;
