import React from 'react';
import BarraNavegacionUsuarios from '../components/BarraNavegacionUsuarios';
import { useFavoritos } from '../context/FavoritosContext';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Favoritos.css';

export default function Favoritos() {
    const { favoritos } = useFavoritos();
    const navigate= useNavigate();
    
    const irADetalle = (id) => {
        navigate(`/producto/${id}`);
    };

    return (
        <>
            <BarraNavegacionUsuarios/>
            <section className="seccion-favoritos">
                <h2>Mis Productos Favoritos</h2>
                {favoritos.length === 0 ? (
                    <p>No has agregado productos a favoritos.</p>
                ) : (
                    <div className="favoritos-grid">
                    {favoritos.map(producto => (
                        <div 
                            key={producto.id} 
                            className="favorito-card"
                            onClick={() => irADetalle(producto.id)}
                        >
                            <img src={producto.images[0]} alt={producto.title} />
                            <h3>{producto.title}</h3>
                            <p>${producto.price}</p>
                        </div>
                    ))}
                    </div>
                )}
            </section>
        </>
    );
}
