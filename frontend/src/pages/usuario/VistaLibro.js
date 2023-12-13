import React, { useEffect } from "react";

import Navbar from "./Navbar.js";

import "./Styles/VistaLibro.css";

export default function VistaLibro() {

  useEffect(() => {
    if (localStorage.getItem("usuario") === null) {
      window.location.href = "http://localhost:3000/";
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="contenedor">
        <div class="acciones">
          <div class="botones">
            <a href="#">
              <i class="fas fa-shopping-cart"></i> Comprar
            </a>
            <a href="#">
              <i class="fas fa-book"></i> Rentar
            </a>
          </div>
        </div>
        <div class="info-libro">
          <div class="imagen">
            <img
              src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg"
              alt="Imagen del libro"
            />
          </div>
          <div class="detalles">
            <h1>Título</h1>
            <div class="sinopsis">
              <p>Sinopsis</p>
            </div>
            <div class="autor">
              <p>Autor</p>
            </div>
            <div class="ano_publicacion">
              <p>Año de publicación</p>
            </div>
            <div class="editorial">
              <p>Editorial</p>
            </div>
          </div>
        </div>
        <div class="comentarios">
          <h2>Comentarios</h2>
          <form>
            <div className="comentario-input">
              <textarea placeholder="Añadir comentario"></textarea>
              <button type="submit">
                <i class="fa fa-paper-plane">Comentar</i>
              </button>
            </div>
          </form>
          <div class="comentario">
            <p>Usuario 1: ¡Excelente libro!</p>
          </div>
          <div class="comentario">
            <p>Usuario 2: Me encantó la historia.</p>
          </div>
        </div>
      </div>
    </>
  );
}
