// src/componentes/Filtros.jsx
import React from 'react';
import '../assets/css/Filtros.css';

function Filtros({ categorias, categoriaSeleccionada, onFiltrar }) {
    return (
        <div className="filtros-container">
        <button 
            className={categoriaSeleccionada === 'todos' ? 'activo' : ''}
            onClick={() => onFiltrar('todos')}
        >
            Todos
        </button>
        {categorias.map((cat) => (
            <button
            key={cat}
            className={categoriaSeleccionada === cat ? 'activo' : ''}
            onClick={() => onFiltrar(cat)}
            >
            {cat}
            </button>
        ))}
        </div>
    );
}

export default Filtros;
