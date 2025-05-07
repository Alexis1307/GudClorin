import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/BarraNavegacion.css';
import { FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';

export default function BarraNavegacion() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate(); // Necesario para redirigir


  const handleNavigate = (ruta, options = {}) => {
    navigate(ruta, options);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handleNavigate('/')}>Good Clothing</div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li onClick={() => handleNavigate('/')}>Inicio</li>
        <li onClick={() => handleNavigate('/hombres', { state: { origen: 'inicio' } })}>Hombres</li>
        <li onClick={() => handleNavigate('/mujeres', { state: { origen: 'inicio' } })}>Mujeres</li>
        <li onClick={() => handleNavigate('/ninos', { state: { origen: 'inicio' } })}>Niños</li>
      </ul>
      <div className="nav-icons">
        <div className="usuario-menu">
          <i className="icono" onClick={toggleSubMenu}><FaUser /></i>
          {isSubMenuOpen && (
            <div className="submenu">
              <button onClick={() => handleNavigate('/login/usuario')}>Usuario</button>
              <button onClick={() => handleNavigate('/login/empresa')}>Empresa</button>
            </div>
          )}
        </div>
        <a href="#carrito" className="icono"><FaShoppingCart /></a>
        <i className="icono menu-hamburguesa" onClick={toggleMenu}><FaBars /></i>
      </div>
    </nav>
  );
}
