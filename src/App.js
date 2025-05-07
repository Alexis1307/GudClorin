import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Dueno from './pages/Dueno';
import Usuarios from './pages/Usuarios';
import LoginUsuario from './pages/LoginUsuario';
import LoginEmpresa from './pages/LoginEmpresa';
import Hombres from './components/Hombres';
import Mujeres from './components/Mujeres';
import Ninos from './components/Ninos';
import ScrollToTop from './components/ScrollToTop';
import Favoritos from './pages/Favoritos';
import Carrito from './pages/Carrito';
import VistaProducto from './components/VistaProducto'; 
import PerfilUsuario from './pages/Perfil';
import { FavoritosProvider } from './context/FavoritosContext';
import { CarritoProvider } from './context/CarritoContext';



export default function App() {
  return (
    <FavoritosProvider>
      <CarritoProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login/usuario" element={<LoginUsuario />} />
            <Route path="/login/empresa" element={<LoginEmpresa />} />
            <Route path="/dueno" element={<Dueno />} />
            <Route path='/usuarios' element= {<Usuarios />}/>
            <Route path="/hombres" element={<Hombres />} />
            <Route path="/mujeres" element={<Mujeres />} />
            <Route path="/ninos" element={<Ninos />} />
            <Route path="/producto/:id" element={<VistaProducto />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            </Routes>
        </Router>
      </CarritoProvider>
    </FavoritosProvider>
  );
}
