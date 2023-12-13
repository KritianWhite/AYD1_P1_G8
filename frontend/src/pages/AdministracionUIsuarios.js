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

  const handleButtonEdit = async (correo) => {
    try {
      const formatearFecha = (fechaOriginal) => {
        const fecha = new Date(fechaOriginal); 
        return fecha.toISOString().substring(0, 10);
      };
      // Extrar datos del usuario
      fetch( `http://localhost:4000/usuario/verperfil/${correo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log("Error:", err);
        })
        .then((response) => {
          console.log(response);
          document.getElementById("swal-nombre").value = response.nombre;
          document.getElementById("swal-apellido").value = response.apellido;
          document.getElementById("swal-telefono").value = response.telefono;
          document.getElementById("swal-email").value = response.email;
          document.getElementById("swal-passwordd").value = response.passwordd;
          document.getElementById("swal-fecha_nacimiento").value = formatearFecha(response.fecha_nacimiento);
      })
      const { value: formValues } = await Swal.fire({
        title: "EDICION DE USUARIO",
        html: `
          <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
          <input id="swal-apellido" class="swal2-input" placeholder="Apellido">
          <input id="swal-telefono" class="swal2-input" placeholder="Telefono">
          <input id="swal-email" class="swal2-input" placeholder="Correo electronico">
          <input id="swal-passwordd" class="swal2-input" placeholder="Contraseña">
          <input id="swal-fecha_nacimiento" type="date" class="swal2-input">
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
            nombre: document.getElementById("swal-nombre").value,
            apellido: document.getElementById("swal-apellido").value,
            telefono: document.getElementById("swal-telefono").value,
            email: document.getElementById("swal-email").value,
            passwordd: document.getElementById("swal-passwordd").value,
            fecha_nacimiento: document.getElementById("swal-fecha_nacimiento").value,
          };
        },
      });

      if (formValues) {
        // Aquí puedes hacer algo con los valores del formulario
        fetch(`http://localhost:4000/usuario/modificarDatos/${correo}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
        ).then((res) => res.json())
        .catch((err) => {
          console.log("Error:", err);
        })
        .then((response) => {
          console.log(response);
          if (response){
            getUsuarios();
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
          }else{
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al mostrar el formulario. " + error,
      });
    }
  };

  const handleButtonDelete = async (correo) => {
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
    const user = localStorage.getItem("usuario");
    if (user == null) {
      window.location.href = "http://localhost:3000/";
    }else{
      getUsuarios();
    }
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
                            onClick={() => handleButtonEdit(usuario.email)}
                          >
                            Editar
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => handleButtonDelete(usuario.email)}
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
