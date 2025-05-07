import BarraNavegacionUsuarios from '../components/BarraNavegacionUsuarios';
import CarruselPrincipal from '../components/CarruselPrincipal';
import OfertasApi from '../components/OfertasApi';
import CuentaRegresivaOferta from '../components/CuentaRegresivaOferta';
import PieDePagina from "../components/PieDePagina";
import CategoriasRopa from '../components/CategoriasRopa';
import MarcasDestacadas from '../components/MarcasDestacadas';
import TestimoniosClientes from '../components/TestimoniosClientes';
import Contactanos from '../components/Contactanos';

function Usuarios() {
    
    return (
        <>
            <BarraNavegacionUsuarios/>
            <CarruselPrincipal />
            <OfertasApi />
            <CuentaRegresivaOferta />
            <CategoriasRopa />
            <MarcasDestacadas />
            <TestimoniosClientes />
            <Contactanos />
            <PieDePagina/>
        </>
    );
}

export default Usuarios;
