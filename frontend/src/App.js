import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from "./pages/Login.js";
import Registro from "./pages/Registro.js";
import AdministracionLibros from './pages/AdmnistracionLibros.js';
import AdministracionUsuarios from './pages/AdministracionUIsuarios.js';
import Inicio from './pages/usuario/Inicio.js';
import VistaLibro from './pages/usuario/VistaLibro.js';
import MisLibros from './pages/usuario/MisLibros.js';
import VerPerfil from './pages/usuario/VerPerfil.js';

import './App.css';

function App() {
  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registerForm" element={<Registro/>}/>
        <Route path="/administracionLibros" element={<AdministracionLibros/>}/>
        <Route path="/administracionUsuarios" element={<AdministracionUsuarios/>}/>
        <Route path="/inicio" element={<Inicio/>}/>
        <Route path="/vistaLibro" element={<VistaLibro/>}/>
        <Route path="/usuario/misLibros" element={<MisLibros/>}/>
        <Route path="/usuario/VerPerfil" element={<VerPerfil/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;
