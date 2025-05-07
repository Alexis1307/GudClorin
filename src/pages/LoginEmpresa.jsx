import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraNavegacion from '../components/BarraNavegacion';
import '../assets/css/LoginEmpresa.css';

export default function LoginEmpresa() {
  const [empresa, setEmpresa] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/dueno');
  };

  return (
    <>
      <BarraNavegacion />
      <div className="login-container">
        <h2>Login Empresa</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Usuario" value={empresa} onChange={e => setEmpresa(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={pass} onChange={e => setPass(e.target.value)} required />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </>
  );
}
