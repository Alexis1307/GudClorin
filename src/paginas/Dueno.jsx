import React, {useState} from "react";
import ListaStock from "../componentes/ListaStock";
import ListaVentas from "../componentes/ListaVentas";
import PanelOpciones from "../componentes/PanelOpciones";
import '../assets/Dueno.css';
import AgregarStock from "../componentes/AgregarStock";
import AgregarVenta from "../componentes/AgregarVenta";
import { FaBars } from 'react-icons/fa'; // icono de menú

function Dueno(){
    const [vista, setVista]= useState("stock");
    const [menuAbierto, setMenuAbierto] = useState(false); // <-- FALTA ESTO

    return(
        <div className="pagina-dueno">
            <div className="cuadro-dueno">
                {!menuAbierto && (
                    <button 
                        className="boton-hamburguesa"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                    >
                        <FaBars />
                    </button>
                )}
                {menuAbierto && <div className="overlay" onClick={() => setMenuAbierto(false)}></div>}

                {/* Menú lateral visible solo si menuAbierto está en true o pantalla grande */}
                <div className={`panel-lateral ${menuAbierto ? 'abierto' : ''}`}>
                    <PanelOpciones setVista={setVista} cerrarMenu={() => setMenuAbierto(false)} />
                </div>

                <div className="panel-vista">
                    {vista === "stock" && <ListaStock />}
                    {vista === "ventas" && <ListaVentas />}
                    {vista === 'agregarStock' && <AgregarStock />}
                    {vista === 'agregarVenta' && <AgregarVenta />}
                </div>
            </div>
        </div>
    );
}

export default Dueno