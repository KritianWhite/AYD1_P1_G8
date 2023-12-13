import React, { useEffect } from "react";

import Navbar from "./Navbar.js";

import "./Styles/MisLibros.css";

export default function VistaLibro() {

  useEffect(() => {
    if (localStorage.getItem("usuario") === null) {
      window.location.href = "http://localhost:3000/";
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="container">
        <div class="card-mislibros">
          <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" />
          <h3>Título del Libro</h3>
          <p>Tipo de adquisición: Compra</p>
        </div>
        <div class="card-mislibros">
          <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" />
          <h3>Título del Libro</h3>
          <p>Tipo de adquisición: Compra</p>
        </div>

        <div class="card-mislibros">
          <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" />
          <h3>Título del Libro</h3>
          <p>Tipo de adquisición: Compra</p>
        </div>

        <div class="card-mislibros">
          <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" />
          <h3>Título del Libro</h3>
          <p>Tipo de adquisición: Compra</p>
        </div>

        <div class="card-mislibros">
          <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" />
          <h3>Título del Libro</h3>
          <p>Tipo de adquisición: Compra</p>
        </div>
      </div>
    </>
  );
}
