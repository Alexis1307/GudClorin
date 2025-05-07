import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraNavegacion from '../components/BarraNavegacion';
import '../assets/css/LoginUsuario.css';

export default function LoginUsuario() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/usuarios');
  };

  return (
    <>
      <BarraNavegacion />
      <div className="login-container">
        <h2>Login Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={pass} onChange={e => setPass(e.target.value)} required />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </>
  );
}
