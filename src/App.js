import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dueno from "./paginas/Dueno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dueno" element= {<Dueno />} />
      </Routes>
    </Router>
  );
}

export default App;