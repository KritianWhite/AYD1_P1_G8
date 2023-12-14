import React, { useState, useEffect } from "react";

import Navbar from "./Navbar.js";

import "./Styles/MisLibros.css";

export default function VistaLibro() {

  const [libros, setLibros] = useState([]);

  const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal); 
    return fecha.toISOString().substring(0, 10);
  };

  useEffect(() => {
    if (localStorage.getItem("usuario") === null) {
      window.location.href = "http://localhost:3000/";
    }else{
      const user =  JSON.parse(localStorage.getItem("usuario")).replace(/"/g, "");
      fetch(`http://localhost:4000/usuario/biblioteca/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log("Error:", err);
        })
        .then((response) => {
          console.log(response);
          setLibros(response);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="container">
        {
          libros.map((libro, index) => {
            return (
              <div key={index} class="card-mislibros">
                <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" />
                <h3>{libro.titulo}</h3>
                <p>Tipo de adquisición: {libro.estado}</p>
                <p>Fecha de devolución: {formatearFecha(libro.fecha_devolucion_renta)}</p>
              </div>
            );
          })
        }
      </div>
    </>
  );
}
