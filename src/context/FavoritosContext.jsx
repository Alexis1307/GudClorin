import React, { createContext, useContext, useState } from 'react';

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
    const [favoritos, setFavoritos] = useState([]);

    const toggleFavorito = (producto) => {
        setFavoritos(prev => {
            const existe = prev.find(p => p.id === producto.id);
                if (existe) {
                    return prev.filter(p => p.id !== producto.id);
                } else {
                    return [...prev, producto];
                }
        });
    };

    return (
        <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
        {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritos() {
    return useContext(FavoritosContext);
}
