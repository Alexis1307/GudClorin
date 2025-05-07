// src/componentes/Hombres.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import BarraNavegacion from '../components/BarraNavegacion';
import BarraNavegacionUsuarios from './BarraNavegacionUsuarios';
import PieDePagina from './PieDePagina';
import '../assets/css/SeccionRopa.css';

// Importar las imágenes
import ropa1    from '../assets/IMG/ROPA 24.webp';
import polo1    from '../assets/IMG/ROPA 28.webp';
import pantalon1 from '../assets/IMG/ROPA 26.webp';
import ropa4    from '../assets/IMG/ROPA 27.webp';
import ropa5    from '../assets/IMG/ROPA 25.webp';
import ropa6    from '../assets/IMG/ROPA 29.jpg';
import ropa7    from '../assets/IMG/ROPA 30.jpg';
import ropa8    from '../assets/IMG/ROPA 31.jpg';
import ropa9    from '../assets/IMG/ROPA 32.webp'; 
import ropa10   from '../assets/IMG/ROPA 33.webp';

function Ninos() {
    const location = useLocation();
    const origen = location.state?.origen;

    const productosHombre = [
        { id: 1, nombre: 'Polo Blanco Estampado',    precio: 'S/ 129.90', imagen: ropa1    },
        { id: 2, nombre: 'Chompa de Lana',         precio: 'S/ 49.90',  imagen: polo1    },
        { id: 3, nombre: 'Vestido Floreado',     precio: 'S/ 89.90',  imagen: pantalon1 },
        { id: 4, nombre: 'Chompa Naranja',          precio: 'S/ 44.90',  imagen: ropa4    },
        { id: 5, nombre: 'Polo Blanco Estampado',      precio: 'S/ 59.90',  imagen: ropa5    },
        { id: 6, nombre: 'Conjunto Jean',     precio: 'S/ 119.90', imagen: ropa6    },
        { id: 7, nombre: 'Conjunto Niña',      precio: 'S/ 109.90', imagen: ropa7 },
        { id: 8, nombre: 'Pantalon Jean',  precio: 'S/ 149.90', imagen: ropa8  },
        { id: 9, nombre: 'Chaleco Verde',      precio: 'S/ 54.90',  imagen: ropa9    },
        { id: 10, nombre: 'Casaca Niño',      precio: 'S/ 54.90',  imagen: ropa10   },
    ];

    return (
        <div className="seccion-ropa">
            {origen === 'usuario' ? <BarraNavegacionUsuarios /> : <BarraNavegacion />}
            <h2 className="titulo-seccion">Ropa para Hombres</h2>

            <div className="filtros">
                <button>Polos</button>
                <button>Pantalones</button>
                <button>Camisas</button>
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

export default Ninos;