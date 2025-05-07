// src/componentes/Mujeres.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import BarraNavegacion from '../components/BarraNavegacion';
import BarraNavegacionUsuarios from './BarraNavegacionUsuarios';
import PieDePagina from './PieDePagina';
import '../assets/css/SeccionRopa.css';

// Importar las imágenes
import vestido1    from '../assets/IMG/ROPA17.jpeg';
import blusa1      from '../assets/IMG/ROPA 18.jpeg';
import falda1      from '../assets/IMG/ROPA11.webp';
import vestido2    from '../assets/IMG/ROPA 12.png';
import blusa2      from '../assets/IMG/ROPA15.webp';
import falda2      from '../assets/IMG/ROPA16.jpeg';
import jeans1      from '../assets/IMG/ROPA13.webp';
import top1        from '../assets/IMG/ROPA14.webp';
import zapatillas1 from '../assets/IMG/ROPA19.jpeg';
import zapatillas2 from '../assets/IMG/ROPA20.jpeg';

const productosMujer = [
  { id: 1, nombre: 'Vestido de Verano',   precio: 'S/ 159.90', imagen: vestido1    },
  { id: 2, nombre: 'Blusa Elegante',      precio: 'S/ 79.90',  imagen: blusa1      },
  { id: 3, nombre: 'Falda Larga',         precio: 'S/ 99.90',  imagen: falda1      },
  { id: 4, nombre: 'Vestido Floral',      precio: 'S/ 129.90', imagen: vestido2    },
  { id: 5, nombre: 'Blusa Casual',        precio: 'S/ 69.90',  imagen: blusa2      },
  { id: 6, nombre: 'Falda Plisada',       precio: 'S/ 89.90',  imagen: falda2      },
  { id: 7, nombre: 'Jeans Skinny',        precio: 'S/ 99.90',  imagen: jeans1      },
  { id: 8, nombre: 'Top de Encaje',       precio: 'S/ 59.90',  imagen: top1        },
  { id: 9, nombre: 'Zapatillas Rosa',     precio: 'S/ 179.90', imagen: zapatillas1 },
  { id: 10, nombre: 'Zapatillas Rosa',     precio: 'S/ 179.90', imagen: zapatillas2 },
];

export default function Mujeres() {
  const location = useLocation();
  const origen = location.state?.origen;

  return (
    <div className="seccion-ropa">
      {origen === 'usuario' ? <BarraNavegacionUsuarios /> : <BarraNavegacion />}
      <h2 className="titulo-seccion">Ropa para Mujeres</h2>

      <div className="filtros">
        <button>Camisetas</button>
        <button>Pantalones</button>
        <button>Vestidos</button>
        <button>Faldas</button>
        <button>Accesorios</button>
      </div>

      <div className="grid-productos">
        {productosMujer.map(producto => (
          <div key={producto.id} className="tarjeta-producto">
            <img src={producto.imagen} alt={producto.nombre} className="imagen-producto" />
            <h3>{producto.nombre}</h3>
            <p>{producto.precio}</p>
            <div className="botones">
              <button className="comprar">Comprar ahora</button>
              <button className="ver-mas">Ver más</button>
            </div>
          </div>
        ))}
      </div>
      <PieDePagina />
    </div>
  );
}
