import React, { useEffect, useState } from 'react';
import '../assets/css/CarruselPrincipal.css';
import slide1 from '../assets/IMG/Carrusel 1.webp';
import slide2 from '../assets/IMG/Carrusel 2.webp';
import slide3 from '../assets/IMG/Carrusel 3.webp';

const slides = [slide1, slide2, slide3];

export default function CarruselPrincipal() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="carrusel-principal">
      <img src={slides[index]} alt={`Slide ${index}`} className="slide-img" />
    </section>
  );
}
