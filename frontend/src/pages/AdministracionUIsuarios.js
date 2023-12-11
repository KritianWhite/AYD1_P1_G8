import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";

import Navbar from "../components/Navbar";
import "./Styles/Administracion.css";

export default function AdmnistracionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  // Obtención de usuarios de backend
  const getUsuarios = (e) => {
    fetch("http://localhost:4000/usuario/", {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error:", err);
      })
      .then((response) => {
        console.log(response);
        setUsuarios(response);
      });
  };
  // Alerta para editar la informacipón del libro
  const handleButtonAdd = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Agregar usuario",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Nombre">
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

  const handleButtonEdit = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "EDICION DE USUARIO",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Nombre">
          <input id="swal-input1" class="swal2-input" placeholder="Apellido">
          <input id="swal-input1" class="swal2-input" placeholder="Telefono">
          <input id="swal-input1" class="swal2-input" placeholder="Correo electronico">
          <input id="swal-input1" class="swal2-input" placeholder="Contraseña">
          <input id="swal-input1" class="swal2-input" placeholder="Fecha de nacimiento">
        `,
        icon: "warning",
        cancelButtonText: "Cancelar", // Texto del botón de cancelar
        confirmButtonText: "Editar", // Texto del botón de aceptar
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
          title: "¡Usuario editado correctamente!",
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
        title: "¿Seguro que quieres eliminar al usuario?",
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
            text: "El usuario ha sido eliminado correctamente.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El usuario no se ha eliminado.",
            icon: "error",
          });
        }
      });
  };

  // Carga de tabla al iniciar la pagina
  useEffect(() => {
    getUsuarios();
  }, []);

  // Formateo de fecha
  const formatFecha = (fecha) => {
    const fechaFormateada = format(new Date(fecha), 'dd/MM/yyyy');
    return fechaFormateada;
  };

  return (
    <>
      <div className="container text-center">
        <Navbar />
        <div className="tabla-libros-administrador">
          <h1>TABLA DE USUARIOS</h1>
          <button
            type="button"
            class="btn btn-outline-primary btn-add-book"
            onClick={handleButtonAdd}
          >
            Agregar usuario
          </button>

          <div class="row">
            <div class="col-md-12">
              <div class="table-wrap">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>APELLIDO</th>
                      <th>TELEFONO</th>
                      <th>EMAIL</th>
                      <th>FECHA DE NACIMIENTO</th>
                      <th>ROL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr>
                        <td scope="row">{usuario.id_usuario}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.apellido}</td>
                        <td>{usuario.telefono}</td>
                        <td>{usuario.email}</td>
                        <td>{formatFecha(usuario.fecha_nacimiento)}</td>
                        <td>{usuario.administrador == 1 ? 'Administrador' : 'Usuario'}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={handleButtonEdit}
                          >
                            Editar
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-danger"
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
