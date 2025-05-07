import React from 'react';
import BarraNavegacionUsuarios from '../components/BarraNavegacionUsuarios';
import '../assets/Perfil.css';
import { FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaLock, FaTrash, FaHeart, FaShoppingBag, FaStar } from 'react-icons/fa';

function PerfilUsuario() {
    const usuario = {
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        fechaRegistro: '2024-08-15',
        direccion: 'Av. Siempre Viva 123',
        avatarUrl: 'https://i.pravatar.cc/150?img=6'
    };

    return (
        <>
            <BarraNavegacionUsuarios/>
            <div className="perfil-page">
                <div className="perfil-card-container">
                    <div className="perfil-avatar">
                        <img src={usuario.avatarUrl} alt="Avatar" />
                        <h2>{usuario.nombre}</h2>
                        <p><FaEnvelope /> {usuario.correo}</p>
                    </div>

                    <div className="perfil-info">
                        <div className="info-item"><FaCalendarAlt /> <strong>Registro:</strong> {usuario.fechaRegistro}</div>
                        <div className="info-item"><FaMapMarkerAlt /> <strong>Dirección:</strong> {usuario.direccion}</div>
                    </div>

                    <div className="perfil-stats">
                        <div className="stat-box"><FaHeart /> <span>Favoritos</span><strong>12</strong></div>
                        <div className="stat-box"><FaShoppingBag /> <span>Compras</span><strong>5</strong></div>
                        <div className="stat-box"><FaStar /> <span>Puntos</span><strong>280</strong></div>
                    </div>

                    <div className="perfil-actions">
                        <button className="btn editar"><FaEdit /> Editar Perfil</button>
                        <button className="btn cambiar"><FaLock /> Cambiar Contraseña</button>
                        <button className="btn eliminar"><FaTrash /> Eliminar Cuenta</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PerfilUsuario;
