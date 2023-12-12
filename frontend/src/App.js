import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from "./pages/Login.js";
import Registro from "./pages/Registro.js";
import AdministracionLibros from './pages/AdmnistracionLibros.js';
import AdministracionUsuarios from './pages/AdministracionUIsuarios.js';

import './App.css';

function App() {
  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/RegisterForm" element={<Registro/>}/>
        <Route path="/AdministracionLibros" element={<AdministracionLibros/>}/>
        <Route path="/AdministracionUsuarios" element={<AdministracionUsuarios/>}/>
      </Routes>
    </Router>

    </>
  );
}

export default App;
