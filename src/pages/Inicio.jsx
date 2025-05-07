import React from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import CarruselPrincipal from '../components/CarruselPrincipal';
import SeccionOfertas from '../components/SeccionOfertas';
import CategoriasRopa from '../components/CategoriasRopa';
import MarcasDestacadas from '../components/MarcasDestacadas';
import TestimoniosClientes from '../components/TestimoniosClientes';
import Contactanos from '../components/Contactanos';
import PieDePagina from '../components/PieDePagina';

export default function Inicio() {
  return (
    <>
      <BarraNavegacion />
      <CarruselPrincipal />
      <SeccionOfertas />
      <CategoriasRopa />
      <MarcasDestacadas />
      <TestimoniosClientes />
      <Contactanos />
      <PieDePagina />
    </>
  );
}
