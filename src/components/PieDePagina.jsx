import React from 'react';
import '../assets/css/PieDePagina.css';
import facebookLogo from '../assets/IMG/Icon 1.webp';  // Asegúrate de colocar las imágenes en la carpeta correcta
import instagramLogo from '../assets/IMG/Icon 2.webp';
import twitterLogo from '../assets/IMG/Icon 3.avif';

export default function PieDePagina() {
  return (
    <footer className="pie-de-pagina">
      <div className="info-footer">
        <div>
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#politicas">Políticas</a></li>
            <li><a href="#terminos">Términos</a></li>
            <li><a href="#ayuda">Ayuda</a></li>
          </ul>
        </div>
        <div>
          <h4>Síguenos</h4>
          <div className="redes">
            <a href="#facebook"><img src={facebookLogo} alt="Facebook" className="logo-redes" /></a>
            <a href="#instagram"><img src={instagramLogo} alt="Instagram" className="logo-redes" /></a>
            <a href="#twitter"><img src={twitterLogo} alt="Twitter" className="logo-redes" /></a>
          </div>
        </div>
      </div>
      <p className="copy">&copy; 2025 Good Clothing. Todos los derechos reservados. <a href="#privacidad">Política de privacidad</a></p>
    </footer>
  );
}
