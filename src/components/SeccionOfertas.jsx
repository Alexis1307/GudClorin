import React from 'react';
import '../assets/css/SeccionOfertas.css';
import vestido from '../assets/IMG/Dest 1.png';
import zapatos from '../assets/IMG/Dest 2.avif';
import chaqueta from '../assets/IMG/Dest 3.webp';

const ofertas = [
  { nombre: "Vestido Elegante", img: vestido, antes: 120, ahora: 90, descuento: 25 },
  { nombre: "Zapatos Urbanos", img: zapatos, antes: 80, ahora: 60, descuento: 25 },
  { nombre: "Chaqueta Moderna", img: chaqueta, antes: 150, ahora: 120, descuento: 20 },
];

export default function SeccionOfertas() {
  return (
    <section className="seccion-ofertas" id="ofertas">
      <h2>Ofertas Especiales</h2>
      <div className="ofertas-cards">
        {ofertas.map((p, i) => (
          <div className="oferta-card" key={i}>
            <div className="etiqueta-descuento">-{p.descuento}%</div>
            <img src={p.img} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p><span className="precio-antes">${p.antes}</span> <span className="precio-ahora">${p.ahora}</span></p>
            <button>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </section>
  );
}
