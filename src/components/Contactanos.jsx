import React from 'react';
import '../assets/css/Contactanos.css';

export default function Contactanos() {
  return (
    <section className="contactanos">
      <h2>Contáctanos</h2>
      <form>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required />
        
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
        
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
