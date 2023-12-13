import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Navbar from "../components/Navbar";
import "./Styles/Administracion.css";

export default function AdmnistracionLibros() {
  const [libros, setLibros] = useState([""]);

  // Obtener libros de backend
  const getLibros = (e) => {
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

  // Alerta para editar la informacipón del libro
  const handleButtonAdd = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "AGREGAR LIBRO",
        html: `
            <input id="swal-titulo" class="swal2-input" placeholder="Titulo del libro">
            <input id="swal-sinopsis" class="swal2-input" placeholder="Sinopsis">
            <input id="swal-autor" class="swal2-input" placeholder="Autor">
            <input id="swal-publicacion" class="swal2-input" placeholder="Año de publicación">
            <input id="swal-editorial" class="swal2-input" placeholder="Editorial">
            <input id="swal-portada" class="swal2-input" placeholder="Portada">
            <input id="swal-precioCompra" class="swal2-input" placeholder="Precio de compra">
            <input id="swal-precioVenta" class="swal2-input" placeholder="Precio de renta">
        `,
        icon: "info",
        cancelButtonText: "Cancelar", // Texto del botón de cancelar
        confirmButtonText: "Agregar", // Texto del botón de aceptar
        showCancelButton: true, // mostrar botón de cancelar
        focusConfirm: false,
        allowOutsideClick: false, // Evita que el usuario haga clic fuera del formulario para cerrar la alerta
        allowEscapeKey: true, // Permite que el usuario cierre la alerta con la tecla Esc
        preConfirm: async () => {
          return {
            titulo: document.getElementById("swal-titulo").value,
            sinopsis: document.getElementById("swal-sinopsis").value,
            precio_compra: document.getElementById("swal-precioCompra").value,
            precio_venta: document.getElementById("swal-precioVenta").value,
            autor: document.getElementById("swal-autor").value,
            anio_publicacion: document.getElementById("swal-publicacion").value,
            editorial: document.getElementById("swal-editorial").value,
            estado: "libre",
            portada: null,
          };
        },
      });
      if (formValues) {
        console.log("Formulario", formValues);
        const user = localStorage.getItem("usuario").replace(/"/g, "");
        fetch(`http://localhost:4000/libro/publicar/${user}`, {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: { "Content-type": "application/json;charset=UTF-8" },
        })
          .then((res) => res.json())
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err,
            });
          })
          .then((response) => {
            //console.log( "Formulario adentro de response ",formValues)
            if (response) {
              getLibros();
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Libro agregado con exito.",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error inesperado, intentelo de nuevo.",
              });
            }
          });
      }
      //console.log("Formulario afuera de response ",formValues)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al mostrar el formulario, intentelo denuevo más tarde.",
      });
    }
  };

  const handleButtonEdit = async (libro) => {
    try {
      // Realizar consulta para obtener lo datos del libro
      fetch(`http://localhost:4000/libro/${libro}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log("Error:", err);
        })
        .then((response) => {
          console.log(response);
          document.getElementById("swal-titulo").value = response.titulo;
          document.getElementById("swal-sinopsis").value = response.sinopsis;
          document.getElementById("swal-autor").value = response.autor;
          document.getElementById("swal-publicacion").value =
            response.anio_publicacion;
          document.getElementById("swal-editorial").value = response.editorial;
          document.getElementById("swal-portada").value = response.portada;
          document.getElementById("swal-precioCompra").value =
            response.precio_compra;
          document.getElementById("swal-precioVenta").value =
            response.precio_venta;
        });

      const { value: formValues } = await Swal.fire({
        title: "EDITAR LIBRO",
        html: `
          <input id="swal-titulo" class="swal2-input" placeholder="Titulo del libro">
          <input id="swal-sinopsis" class="swal2-input" placeholder="Sinopsis">
          <input id="swal-autor" class="swal2-input" placeholder="Autor">
          <input id="swal-publicacion" class="swal2-input" placeholder="Año de publicación">
          <input id="swal-editorial" class="swal2-input" placeholder="Editorial">
          <input id="swal-portada" class="swal2-input" placeholder="Portada">
          <input id="swal-precioCompra" class="swal2-input" placeholder="Precio de compra">
          <input id="swal-precioVenta" class="swal2-input" placeholder="Precio de renta">
        `,
        icon: "warning",
        cancelButtonText: "Cancelar", // Texto del botón de cancelar
        confirmButtonText: "Editar", // Texto del botón de aceptar
        showCancelButton: true, // mostrar botón de cancelar
        focusConfirm: false,
        allowOutsideClick: false, // Evita que el usuario haga clic fuera del formulario para cerrar la alerta
        allowEscapeKey: true, // Permite que el usuario cierre la alerta con la tecla Esc
        preConfirm: async () => {
          return {
            titulo: document.getElementById("swal-titulo").value,
            sinopsis: document.getElementById("swal-sinopsis").value,
            precio_compra: document.getElementById("swal-precioCompra").value,
            precio_venta: document.getElementById("swal-precioVenta").value,
            autor: document.getElementById("swal-autor").value,
            anio_publicacion: document.getElementById("swal-publicacion").value,
            editorial: document.getElementById("swal-editorial").value,
            estado: "libre",
            portada: null,
          };
        },
      });

      if (formValues) {
        // Aquí puedes hacer algo con los valores del formulario
        const user = localStorage.getItem("usuario").replace(/"/g, "");
        // Realizar consulta para edutar el libro
        fetch(`http://localhost:4000/libro/editar/${user}/${libro}`, {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: { "Content-type": "application/json;charset=UTF-8" },
        })
          .then((res) => res.json())
          .catch((err) => {
            console.log("Error:", err);
          })
          .then((response) => {
            // console.log(response);
            if (response) {
              getLibros();
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "¡Libro editado correctamente!",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error inesperado, intentelo de nuevo.",
              });
            }
          });
      } else {
        // El usuario canceló el formulario
        console.log("El usuario canceló el formulario");
      }
    } catch (error) {
      console.error("Error al mostrar el formulario:", error);
    }
  };

  const handleButtonDelete = async (libro) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Seguro que quieres eliminar el libro?",
        text: "¡Esta acción ya no podrá ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar.",
        cancelButtonText: "Cancelar.",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const user = localStorage.getItem("usuario").replace(/"/g, "", {
            method: "GET",
            headers: { "Content-type": "application/json" },
          });
          fetch(`http://localhost:4000/libro/eliminar/${user}/${libro}`)
            .then((res) => res.json())
            .catch((err) => {
              console.log("Error:", err);
            })
            .then((response) => {
              if (response) {
                getLibros();
                swalWithBootstrapButtons.fire({
                  title: "Eliminado!",
                  text: "El libro ha sido eliminado correctamente.",
                  icon: "success",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrio un error inesperado, intentelo de nuevo.",
                });
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El libro no se ha eliminado.",
            icon: "error",
          });
        }
      });
  };

  //Cargar libros al cargar la página
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
      <div className="container-libros">
        <Navbar />
        <div className="tabla-libros-administrador">
          <h1>TABLA DE LIBROS</h1>
          <button
            type="button"
            class="btn btn-outline-primary btn-add-book"
            onClick={handleButtonAdd}
          >
            Agregar libro
          </button>

          <div class="row">
            <div class="col-md-12">
              <div class="table-wrap">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>TITULO</th>
                      <th>SINOPSIS</th>
                      <th>AUTOR</th>
                      <th>PUBLICACION</th>
                      <th>EDITORIAL</th>
                      <th>PORTADA</th>
                      <th>PRECIO COMPRA</th>
                      <th>PRECIO RENTA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {libros.map((libro) => (
                      <tr key={libro.id_libro}>
                        <th scope="row">{libro.id_libro}</th>
                        <td>{libro.titulo}</td>
                        <td>{libro.sinopsis}</td>
                        <td>{libro.autor}</td>
                        <td>{libro.anio_publicacion}</td>
                        <td>{libro.editorial}</td>
                        <td>{libro.portada}</td>
                        <td>{libro.precio_compra}</td>
                        <td>{libro.precio_venta}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => handleButtonEdit(libro.titulo)}
                          >
                            Editar
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleButtonDelete(libro.titulo)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
