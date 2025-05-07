import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/BarraNavegacionUsuarios.css';
import { Link } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';
import { useCarrito } from '../context/CarritoContext';
import { FaUser, FaShoppingCart, FaBars, FaHeart } from 'react-icons/fa';

function BarraNavegacionUsuarios() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { favoritos } = useFavoritos();
    const { carrito } = useCarrito();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const handleNavigate = (ruta, options = {}) => {
        navigate(ruta, options);
    };

    const handleLogout = () => {
        // Por ahora solo redirige a inicio
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => handleNavigate('/usuarios')}>Good Clothing</div>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li onClick={() => handleNavigate('/usuarios')}>Inicio</li>
                <li onClick={() => handleNavigate('/hombres', { state: { origen: 'usuario' } })}>Hombres</li>
                <li onClick={() => handleNavigate('/mujeres', { state: { origen: 'usuario' } })}>Mujeres</li>
                <li onClick={() => handleNavigate('/ninos', { state: { origen: 'usuario' } })}>Niños</li>
            </ul>

            <div className="nav-icons">
                <div className="favoritos-icono">
                    <Link to="/favoritos" title="Favoritos" className="icono">
                        <FaHeart />
                    </Link>
                    {favoritos.length > 0 && (
                        <span className="contador-favoritos">{favoritos.length}</span>
                    )}
                </div>
                <div className="carrito-icono">
                <Link to="/carrito" title="Carrito" className="icono">
                    <FaShoppingCart />
                    </Link>
                    {carrito.length > 0 && (
                        <span className="contador-carrito">
                            {carrito.reduce((total, prod) => total + prod.cantidad, 0)}
                        </span>
                    )}
                </div>


                <div className="usuario-menu">
                    <i className="icono" onClick={toggleSubMenu}><FaUser /></i>
                    {isSubMenuOpen && (
                        <div className="submenu">
                            <button onClick={() => handleNavigate('/perfil')}>Perfil</button>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </div>
                    )}
                </div>

                <i className="icono menu-hamburguesa" onClick={toggleMenu}><FaBars /></i>
            </div>
        </nav>
    );
}

export default BarraNavegacionUsuarios;
