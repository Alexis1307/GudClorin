import React from 'react';
import '../assets/css/TestimoniosClientes.css';
import lucia from '../assets/IMG/lucia.webp';
import carlos from '../assets/IMG/carlos.webp';
import maria from '../assets/IMG/maria.png';

const testimonios = [
  { nombre: "Lucía Gómez", rol: "Influencer de Moda", texto: "¡Me encantaron los zapatos! Calidad excelente y envío rápido.", img: lucia },
  { nombre: "Carlos Méndez", rol: "Estilista", texto: "La atención al cliente fue excepcional y las prendas son hermosas.", img: carlos },
  { nombre: "María López", rol: "Compradora Fiel", texto: "Siempre encuentro lo que busco. ¡Muy recomendable!", img: maria },
];

export default function TestimoniosClientes() {
  return (
    <section className="testimonios-clientes">
      <h2>Testimonios</h2>
      <div className="testimonios-cards">
        {testimonios.map((t,i) => (
          <div className="testimonial" key={i}>
            <img src={t.img} alt={t.nombre} />
            <p>"{t.texto}"</p>
            <h4>{t.nombre}</h4>
            <span>{t.rol}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
