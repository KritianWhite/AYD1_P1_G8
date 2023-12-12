import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Navbar from "../components/Navbar";
import "./Styles/Administracion.css";

export default function AdmnistracionLibros() {
  const [libros, setLibros] = useState([]);

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
        setLibros(response);
        console.log(libros);
      });
  };

  // Alerta para editar la informacipón del libro
  const handleButtonAdd = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "AGREGAR LIBRO",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Titulo del libro">
          <input id="swal-input1" class="swal2-input" placeholder="Sinopsis">
          <input id="swal-input1" class="swal2-input" placeholder="Autor">
          <input id="swal-input1" class="swal2-input" placeholder="Año de publicación">
          <input id="swal-input1" class="swal2-input" placeholder="Editorial">
          <input id="swal-input1" class="swal2-input" placeholder="Portada">
          <input id="swal-input1" class="swal2-input" placeholder="Precio de compra">
          <input id="swal-input1" class="swal2-input" placeholder="Precio de renta">
        `,
        icon: "info",
        cancelButtonText: "Cancelar", // Texto del botón de cancelar
        confirmButtonText: "Agregar", // Texto del botón de aceptar
        showCancelButton: true, // mostrar botón de cancelar
        focusConfirm: false,
        allowOutsideClick: false, // Evita que el usuario haga clic fuera del formulario para cerrar la alerta
        allowEscapeKey: true, // Permite que el usuario cierre la alerta con la tecla Esc
        preConfirm: () => {
          return [document.getElementById("swal-input1").value];
        },
      });

      if (formValues) {
        // Aquí puedes hacer algo con los valores del formulario
        console.log("Libro agregado exitsamente", formValues);
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
          title: "¡Libro agregado exitosamente!",
        });
      } else {
        // El usuario canceló el formulario
        console.log("El usuario canceló el formulario");
      }
    } catch (error) {
      console.error("Error al mostrar el formulario:", error);
    }
  };

  const handleButtonEdit = async (libro) => {
    try {

      // Realizar consulta para obtener lo datos del libro
      const response = await fetch(`http://localhost:4000/libro/maria.gomez@email.com/${libro}`)
      const data = await response.json();
      console.log(data);

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
        preConfirm: () => {
          return {
            titulo: document.getElementById("swal-titulo").value,
            sinopsis: document.getElementById("swal-sinopsis").value,
            autor: document.getElementById("swal-autor").value,
            publicacion: document.getElementById("swal-publicacion").value,
            editorial: document.getElementById("swal-editorial").value,
            portada: document.getElementById("swal-portada").value,
            precioCompra: document.getElementById("swal-precioCompra").value,
            precioVenta: document.getElementById("swal-precioVenta").value
          }
        },
      });

      if (formValues) {
        // Aquí puedes hacer algo con los valores del formulario
        console.log("Formulario enviado:", formValues);
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
        // El usuario canceló el formulario
        console.log("El usuario canceló el formulario");
      }
    } catch (error) {
      console.error("Error al mostrar el formulario:", error);
    }
  };

  const handleButtonDelete = async () => {
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
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "El libro ha sido eliminado correctamente.",
            icon: "success",
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

  // Cargar libros al cargar la página
  useEffect(() => {
    getLibros();
  }, []);

  return (
    <>
      <div className="container text-center">
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
                            onClick={handleButtonDelete}
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
