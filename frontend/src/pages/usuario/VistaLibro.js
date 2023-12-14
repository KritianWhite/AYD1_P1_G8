import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./Navbar.js";

import "./Styles/VistaLibro.css";

export default function VistaLibro() {

  // variables para obtener los datos
  const [tittulo, setTitulo] = useState(""); // [variable, funcion que actualiza la variable
  const [sinopsis, setSinopsis] = useState("");
  const [autor, setAutor] = useState("");
  const [anio_publicacion, setAno_publicacion] = useState("");
  const [editorial, setEditorial] = useState("");

  const { titulo } = useParams();

  useEffect(() => {
    if (localStorage.getItem("usuario") === null) {
      window.location.href = "http://localhost:3000/";
    }else{
      fetch(`http://localhost:4000/libro/${titulo}`, {
        method:"GET",
        headers:{
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .catch(err =>{
        console.log('Error:',err);
    })
    .then(response => {
        setTitulo(response.titulo);
        setSinopsis(response.sinopsis);
        setAutor(response.autor);
        setAno_publicacion(response.anio_publicacion);
        setEditorial(response.editorial);
    })
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
            <h1>Título: {tittulo}</h1>
            <div class="sinopsis">
              <p>Sinopsis: {sinopsis}</p>
            </div>
            <div class="autor">
              <p>Autor: {autor}</p>
            </div>
            <div class="ano_publicacion">
              <p>Año de publicación: {anio_publicacion}</p>
            </div>
            <div class="editorial">
              <p>Editorial: {editorial}</p>
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
