// src/componentes/Hombres.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import BarraNavegacion from '../components/BarraNavegacion';
import BarraNavegacionUsuarios from './BarraNavegacionUsuarios';
import PieDePagina from './PieDePagina';
import '../assets/css/SeccionRopa.css';

// Importar las imágenes
import ropa1    from '../assets/IMG/ROPA9.jpeg';
import polo1    from '../assets/IMG/ROPA4.jpeg';
import pantalon1 from '../assets/IMG/ROPA6.jpeg';
import ropa4    from '../assets/IMG/ROPA 2.png';
import ropa5    from '../assets/IMG/ROPA5.jpeg';
import ropa6    from '../assets/IMG/ROPA7.jpeg';
import ropa7    from '../assets/IMG/ROPA8.jpeg';
import ropa8    from '../assets/IMG/ROPA 23.jpg';
import ropa9    from '../assets/IMG/ROPA 22.jpg'; 
import ropa10   from '../assets/IMG/ROPA 21.jpg';

export default function Hombres() {
  const location = useLocation();
  const origen = location.state?.origen;

  const productosHombre = [
    { id: 1, nombre: 'Casaca Oversize',    precio: 'S/ 129.90', imagen: ropa1    },
    { id: 2, nombre: 'Polo Básico',         precio: 'S/ 49.90',  imagen: polo1    },
    { id: 3, nombre: 'Pantalón Jogger',     precio: 'S/ 89.90',  imagen: pantalon1 },
    { id: 4, nombre: 'Polo Negro',          precio: 'S/ 44.90',  imagen: ropa4    },
    { id: 5, nombre: 'Camiseta Verde',      precio: 'S/ 59.90',  imagen: ropa5    },
    { id: 6, nombre: 'Chompa de Punto',     precio: 'S/ 119.90', imagen: ropa6    },
    { id: 7, nombre: 'Jeans Slim Fit',      precio: 'S/ 109.90', imagen: ropa7 },
    { id: 8, nombre: 'Casaca Impermeable',  precio: 'S/ 149.90', imagen: ropa8  },
    { id: 9, nombre: 'Polo Estampado',      precio: 'S/ 54.90',  imagen: ropa9    },
    { id: 10, nombre: 'Polo Estampado',      precio: 'S/ 54.90',  imagen: ropa10   },
  ];

  return (
    <div className="seccion-ropa">
      {origen === 'usuario' ? <BarraNavegacionUsuarios /> : <BarraNavegacion />}
      <h2 className="titulo-seccion">Ropa para Hombres</h2>

      <div className="filtros">
        <button>Camisetas</button>
        <button>Pantalones</button>
        <button>Casacas</button>
        <button>Accesorios</button>
      </div>

      <div className="grid-productos">
        {productosHombre.map(producto => (
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
