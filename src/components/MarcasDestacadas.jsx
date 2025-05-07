import React from 'react';
import '../assets/css/MarcasDestacadas.css';
import nike from '../assets/IMG/Logo 2.jpg';
import adidas from '../assets/IMG/logo 1.png';
import gucci from '../assets/IMG/Logo 3.jpg';
import hm from '../assets/IMG/Logo 4.jpg';

export default function MarcasDestacadas() {
  return (
    <section className="marcas-destacadas">
      <h2>Marcas que Amamos</h2>
      <div className="logos-marcas">
        <img src={nike} alt="Nike" />
        <img src={adidas} alt="Adidas" />
        <img src={gucci} alt="Gucci" />
        <img src={hm} alt="H&M" />
      </div>
    </section>
  );
}

