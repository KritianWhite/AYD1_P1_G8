import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Navbar from "./Navbar.js";

import "./Styles/VistaLibro.css";

export default function VistaLibro() {
  // variables para obtener los datos
  const [tittulo, setTitulo] = useState(""); // [variable, funcion que actualiza la variable
  const [sinopsis, setSinopsis] = useState("");
  const [autor, setAutor] = useState("");
  const [anio_publicacion, setAno_publicacion] = useState("");
  const [editorial, setEditorial] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioRenta, setPrecioRenta] = useState("");
  const [comentar, setComentar] = useState("");
  const [comentarios, setComentarios] = useState([]);

  const { titulo } = useParams();

  const handleComentar = async (e) => {
    const user = localStorage.getItem("usuario").replace(/"/g, "");
    fetch(`http://localhost:4000/libro/escribirComentario/${user}/${titulo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comentario: comentar,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error:", err);
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };

  const handleComprar = async (e) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `¿Seguro que quieres comprar el libro ${titulo} por Q.${precioCompra}?`,
        text: "¡Esta acción ya no podrá ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, comprar.",
        cancelButtonText: "Cancelar.",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const user = localStorage.getItem("usuario").replace(/"/g, "");
          fetch(`http://localhost:4000/libro/comprar/${user}/${titulo}`, {
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
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "¡Compra con éxito! Podrás encontrar tu libro en tu biblioteca.",
              });
              //window.location.reload();
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El libro no se ha comprado. ¡Sigue disfrutando de nuestra biblioteca!",
            icon: "error",
          });
        }
      });
  };

  const handleRentar = async (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `¿Seguro que quieres rentar el libro ${titulo} por Q.${precioRenta}?`,
        html: `<p>Ingresa la fecha de devolución:</p>
              <input type="date" id="fecha-devolucion" name="fecha">`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, rentar.",
        cancelButtonText: "Cancelar.",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const user = localStorage.getItem("usuario").replace(/"/g, "");
          fetch(`http://localhost:4000/libro/rentar/${user}/${titulo}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fecha_devolucion: document.getElementById("fecha-devolucion").value,
            }),
          })
            .then((res) => res.json())
            .catch((err) => {
              console.log("Error:", err);
            })
            .then((response) => {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "¡Rentado con éxito! Podrás encontrar el libro en tu biblioteca.",
              });
              //window.location.reload();
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El libro no se ha rentado. ¡Sigue disfrutando de nuestra biblioteca!",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("usuario") === null) {
      window.location.href = "http://localhost:3000/";
    } else {
      fetch(`http://localhost:4000/libro/${titulo}`, {
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
          setTitulo(response.titulo);
          setSinopsis(response.sinopsis);
          setAutor(response.autor);
          setAno_publicacion(response.anio_publicacion);
          setEditorial(response.editorial);
          setPrecioCompra(response.precio_compra);
          setPrecioRenta(response.precio_venta);
        });

      // Para obtener los comentarios
      fetch(`http://localhost:4000/libro/comentarios/${titulo}`, {
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
          if (
            response.message != "No se encontraron comentarios para el libro"
          ) {
            setComentarios(response);
          } else {
            setComentarios([{ nombre: "Usuario", comentario: "...." }]);
          }
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="contenedor">
        <div class="acciones">
          <div class="botones">
            <button className="btn-acciones" onClick={handleComprar}>
              <a>
                <i class="fas fa-shopping-cart"></i> Q.{precioCompra}
              </a>
            </button>
            <button className="btn-acciones"  onClick={handleRentar}>  
              <a>
                <i class="fas fa-book"></i> Q.{precioRenta}
              </a>
            </button>
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
              <textarea
                placeholder="Añadir comentario"
                value={comentar}
                onChange={(e) => setComentar(e.target.value)}
              ></textarea>
              <button onClick={() => handleComentar()}>
                <i class="fa fa-paper-plane">Comentar</i>
              </button>
            </div>
          </form>
          {comentarios.map((comentario, index) => (
            <div key={index} class="comentario">
              <p>
                {comentario.nombre}: {comentario.comentario}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
