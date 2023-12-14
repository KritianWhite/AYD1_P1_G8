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
    if (localStorage.getItem("usuario") == null) {
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
          if (response.message != "No se encontraron libros rentados/comprados por el usuario") {
            setLibros(response);
          }else{
            setLibros([{
              "anio_publicacion": 2023,
              "autor": "Nombre del autor",
              "editorial": "Editorial",
              "estado": "rentado",
              "fecha_devolucion_renta": "2021-05-03T06:00:00.000Z",
              "id_libro": 5,
              "portada": null,
              "precio_compra": 0,
              "precio_venta": 0,
              "sinopsis": "Sinopsis",
              "titulo": "Titulo"
            }]);
          }
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="container">
        {libros.map((libro, index) => {
            return (
              <div key={index} class="card-mislibros">
                <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" />
                <h3>{libro.titulo}</h3>
                <p>Tipo de adquisición: {libro.estado}</p>
                <p>Fecha de devolución: {formatearFecha(libro.fecha_devolucion_renta)}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
