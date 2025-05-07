import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../assets/css/CategoriasRopa.css';
import model1 from '../assets/IMG/MODEL 1.png';
import model2 from '../assets/IMG/MODEL 2.png';
import model3 from '../assets/IMG/MODEL 3.jpg';

export default function CategoriasRopa() {
  const navigate= useNavigate();
  
  return (
    <section className="categorias-ropa">
      <h2>Categorías</h2>
      <div className="categorias-cards" >
        <div className="categoria" onClick={() => navigate('/Hombres')}>
          <img src={model1} alt="Hombres" />
          <h3>Hombres</h3>
        </div>
        <div className="categoria" onClick={() => navigate('/Mujeres')}>
          <img src={model2} alt="Mujeres" />
          <h3>Mujeres</h3>
        </div>
        <div className="categoria" onClick={() => navigate('/Niños')}>
          <img src={model3} alt="Niños" />
          <h3>Niños</h3>
        </div>
      </div>
    </section>
  );
}
