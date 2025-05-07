import React, { useEffect, useState } from 'react';
import '../assets/css/CuentaRegresivaOferta.css';

export default function CuentaRegresivaOferta() {
    const calcularSegundosHastaMedianoche = () => {
        const ahora = new Date();
        const medianoche = new Date();
        medianoche.setHours(24, 0, 0, 0); // Próxima medianoche
        return Math.floor((medianoche - ahora) / 1000);
    };

    const [tiempoRestante, setTiempoRestante] = useState(calcularSegundosHastaMedianoche());

    useEffect(() => {
        const intervalo = setInterval(() => {
        setTiempoRestante(prev => {
            if (prev <= 0) {
            return calcularSegundosHastaMedianoche(); // Reinicia automáticamente
            }
            return prev - 1;
        });
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    const horas = Math.floor(tiempoRestante / 3600);
    const minutos = Math.floor((tiempoRestante % 3600) / 60);
    const segundos = tiempoRestante % 60;

    return (
        <div className="cronometro-container">
        <h3>¡Oferta válida solo por hoy!</h3>
        <div className="cronometro">
            <div className="casilla">
            <span>{String(horas).padStart(2, '0')}</span>
            <p>Horas</p>
            </div>
            <div className="casilla">
            <span>{String(minutos).padStart(2, '0')}</span>
            <p>Minutos</p>
            </div>
            <div className="casilla">
            <span>{String(segundos).padStart(2, '0')}</span>
            <p>Segundos</p>
            </div>
        </div>
        <p className="mensaje">¡No pierdas esta oferta exclusiva de hoy!</p>
        </div>
    );
}
