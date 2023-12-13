import React, { useState, useEffect } from "react";

import Navbar from "./Navbar.js";

import "./Styles/Inicio.css";

export default function Inicio() {
  const [libros, setLibros] = useState([]);

  const getLibros = async (e) => {
    fetch("http://localhost:4000/libro/", {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error:", err);
      })
      .then((response) => {
        console.log(response);
        setLibros(response || []);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user == null) {
      window.location.href = "http://localhost:3000/";
    } else {
      getLibros();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div id="mostrar-usuarios">
        <div class="container">
          <div class="row" id="perfiles">
            {libros.map((libro, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="our-team">
                  <div className="pic">
                    <img
                      src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg"
                      alt={`Portada de ${libro.titulo}`}
                    />
                  </div>
                  <h3 className="title">{libro.titulo}</h3>
                  <p className="post">{libro.sinopsis}</p>
                  <ul className="social">
                    <li>
                      <a href="#">
                        <i class="fas fa-shopping-cart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fas fa-book"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
