import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    // Función para agregar productos con cantidad
    const agregarAlCarrito = (producto) => {
            setCarrito((prevCarrito) => {
                const productoExistente = prevCarrito.find((p) => p.id === producto.id);
                if (productoExistente) {
                    return prevCarrito.map((p) =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                    );
                } else {
                    return [...prevCarrito, { ...producto, cantidad: 1 }];
                }
            });
        };

        const eliminarDelCarrito = (id, cantidad) => {
            setCarrito((prevCarrito) => {
                return prevCarrito.map((producto) => {
                    if (producto.id === id) {
                        if (producto.cantidad > cantidad) {
                            return { ...producto, cantidad: producto.cantidad - cantidad };
                        } else {
                            return null; // Si la cantidad a eliminar es igual a la cantidad en el carrito, eliminamos el producto
                        }
                    }
                    return producto;
                }).filter((producto) => producto !== null); // Filtramos los productos nulos
            });
        };

    const estaEnCarrito = (id) => {
        return carrito.some((item) => item.id === id);
    };

    return (
        <CarritoContext.Provider
            value={{ carrito, agregarAlCarrito, eliminarDelCarrito, estaEnCarrito }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export const useCarrito = () => useContext(CarritoContext);
