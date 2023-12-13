import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Navbar from "./Navbar.js";

import "./Styles/MisLibros.css";
import { set } from "date-fns";

export default function VistaLibro() {
  const [contraseña, setContraseña] = useState("");
  const [edicionHabilitada, setEdicionHabilitada] = useState(false);
  const [cambiarContraseña, setCambiarContraseña] = useState(false);

  const getuser = async (e) => {
    const formatearFecha = (fechaOriginal) => {
      const fecha = new Date(fechaOriginal);
      return fecha.toISOString().substring(0, 10);
    };
    const user = localStorage.getItem("usuario").replace(/"/g, "");
    fetch(`http://localhost:4000/usuario/verperfil/${user}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error:", err);
      })
      .then((response) => {
        console.log(response);
        document.getElementById("nombre").value = response.nombre;
        document.getElementById("apellido").value = response.apellido;
        document.getElementById("correo").value = response.email;
        document.getElementById("telefono").value = response.telefono;
        document.getElementById("fecha_nacimiento").value = formatearFecha(
          response.fecha_nacimiento
        );
        setContraseña(response.passwordd);
      });
  };

  // Estados para poder editar el formulario de datos del usuario
  const handleActualizarDatos = () => {
    setEdicionHabilitada(true);
  };

  const handleCancelar = () => {
    setEdicionHabilitada(false);
    getuser();
  };

  const handleConfirmar = () => {
    setEdicionHabilitada(false);
    //handleEnviarDatos();
    const usuarioObj = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      email: document.getElementById("correo").value,
      telefono: document.getElementById("telefono").value,
      fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
      passwordd: contraseña,
    };
    const user = localStorage.getItem("usuario").replace(/"/g, "");
    fetch(`http://localhost:4000/usuario/modificarDatos/${user}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioObj),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error:", err);
      })
      .then((response) => {
        if (response) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "¡Datos actualizados correctamente!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error inesperado, intentelo de nuevo.",
          });
        }
      });
  };

  // Handles para poder cambiar la contraseña del usuario
  const handleCambiarContraseña = () => {
    setCambiarContraseña(true);
  };

  const handleCancelarContraseña = () => {
    setCambiarContraseña(false);
    document.getElementById("contra1").value = "";
    document.getElementById("contra2").value = "";
    document.getElementById("contra3").value = "";
  };

  const handleConfirmarContraseña = () => {
    if (
      document.getElementById("contra1").value ==
      document.getElementById("contra2").value
    ) {
      if (document.getElementById("contra3").value == contraseña) {
        const user = localStorage.getItem("usuario").replace(/"/g, "");
        fetch(`http://localhost:4000/usuario/cambiarPass/${user}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: document.getElementById("contra1").value,
          }),
        })
          .then((res) => res.json())
          .catch((err) => {
            console.log("Error:", err);
          })
          .then((response) => {
            if (response) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "¡Contraseña actualizada correctamente!",
              });
              setCambiarContraseña(false);
              document.getElementById("contra1").value = "";
              document.getElementById("contra2").value = "";
              document.getElementById("contra3").value = "";
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error inesperado, intentelo de nuevo.",
              });
            }
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Contraseña incorrecta. Intentelo de nuevo.",
        });
        document.getElementById("contra3").value = "";
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden.",
      });
      document.getElementById("contra2").value = "";
    }
  };

  useEffect(() => {
    if (localStorage.getItem("usuario") == null) {
      window.location.href = "http://localhost:3000/";
    }else{
      getuser();
    }
  }, []);

  return (
    <>
      <div class="contenedor">
        <Navbar />
      </div>
      <div class="container">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Detalles de usuario</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="fullName">Nombre</label>
                      <input
                        type="text"
                        class="form-control"
                        id="nombre"
                        placeholder="Nombre"
                        disabled={!edicionHabilitada}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="website">Apellido</label>
                      <input
                        type="text"
                        class="form-control"
                        id="apellido"
                        placeholder="Apellido"
                        disabled={!edicionHabilitada}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="eMail">Correo</label>
                      <input
                        type="email"
                        class="form-control"
                        id="correo"
                        placeholder="Correo electronico"
                        disabled={!edicionHabilitada}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Telefono</label>
                      <input
                        type="text"
                        class="form-control"
                        id="telefono"
                        placeholder="Telefono"
                        disabled={!edicionHabilitada}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="website">Fecha de nacimiento</label>
                      <input
                        type="date"
                        class="form-control"
                        id="fecha_nacimiento"
                        placeholder="Fecha de nacimiento"
                        disabled={!edicionHabilitada}
                      />
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-secondary"
                        onClick={handleCancelar}
                        disabled={!edicionHabilitada}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-primary"
                        onClick={handleActualizarDatos}
                        disabled={edicionHabilitada}
                      >
                        Actualizar datos
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-success"
                        onClick={handleConfirmar}
                        disabled={!edicionHabilitada}
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Cambiar contraseña</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="Street">Nueva contraseña</label>
                      <input
                        type="password"
                        class="form-control"
                        id="contra1"
                        placeholder="Ingrese su contraseña"
                        disabled={!cambiarContraseña}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">Confirmar contraseña</label>
                      <input
                        type="password"
                        class="form-control"
                        id="contra2"
                        placeholder="Ingrese su contraseña"
                        disabled={!cambiarContraseña}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="sTate">Contraseña actual</label>
                      <input
                        type="password"
                        class="form-control"
                        id="contra3"
                        placeholder="Ingrese su contraseña"
                        disabled={!cambiarContraseña}
                      />
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-secondary"
                        onClick={handleCancelarContraseña}
                        disabled={!cambiarContraseña}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-primary"
                        onClick={handleCambiarContraseña}
                        disabled={cambiarContraseña}
                      >
                        Cambiar contraseña
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        class="btn btn-success"
                        onClick={handleConfirmarContraseña}
                        disabled={!cambiarContraseña}
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
