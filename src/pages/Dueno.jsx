import React, {useState} from "react";
import PanelOpciones from "../components/PanelOpciones";
import ListaStock from "../components/ListaStock";
import AgregarStock from "../components/AgregarStock";
import ListaVentas from "../components/ListaVentas";
import AgregarVenta from "../components/AgregarVenta";
import ListaClientes from '../components/ListaCliente';
import AgregarCliente from '../components/AgregarCliente';
import { FaBars } from 'react-icons/fa';
import '../assets/Dueno.css';


function Dueno(){
    const [vista, setVista]= useState("stock");
    const [menuAbierto, setMenuAbierto] = useState(false);

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
                    {vista === 'agregarStock' && <AgregarStock />}
                    {vista === "ventas" && <ListaVentas />}
                    {vista === 'agregarVenta' && <AgregarVenta />}
                    {vista === 'clientes' && <ListaClientes />}
                    {vista === 'agregarCliente' && <AgregarCliente />}
                </div>
            </div>
        </div>
    );
}

export default Dueno