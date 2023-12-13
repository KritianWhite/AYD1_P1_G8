import React, { useState } from "react";
import Swal from "sweetalert2";

import Usuario from "../components/Usuario";

import "./Styles/Registro.css";

const Registro = () => {
  const [correo, setCorreo] = useState("");
  const [name, setName] = useState("");
  const [lastName, setApellido] = useState("");
  const [numero, setNumero] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, confirmsetPassword] = useState("");
  const [fechaNacimiento, setFecha] = useState("");
  const [isValidPassword, setValidPassword] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const Login = () => {
    window.location.href = "http://localhost:3000/";
  };

  const registrar = () => {
    var nombre = name;
    var apellido = lastName;
    var telefono = numero;
    var email = correo;
    var passwordd = password;
    var passwordd2 = confirmpassword;
    var fecha_nacimiento = fechaNacimiento;

    // Verificar si algún campo está vacío
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      telefono.trim() === "" ||
      email.trim() === "" ||
      passwordd.trim() === "" ||
      passwordd2.trim() === "" ||
      fecha_nacimiento.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Campos vacios, por favor llenar todos los campos.",
      });
    } else {
      if (isValidPassword) {
        if (password === confirmpassword) {
          var Usuario = {
            nombre,
            apellido,
            telefono,
            email,
            passwordd,
            fecha_nacimiento,
            administrador:0,
          };
          fetch("http://localhost:4000/usuario/registrar", {
            method: "POST",
            body: JSON.stringify(Usuario),
            headers: { "Content-type": "application/json;charset=UTF-8" },

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
                  timer: 1500,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "Agregado con exito."
                }); 
                window.location.href = "http://localhost:3000/";
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrion un error inesperado, intentelo denuevo.",
                });
              }
            });
            console.log(Usuario)
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Las contaseñas no coinciden, revise e intentelo denuevo.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Las contaseña debe de contener minimo 8 caracteres, una mayuscula y un numero.",
        });
      }
    }
  };

  // Validacion de passworddseña
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Realizar la validación
    const isValid =
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /\d/.test(newPassword);

    setValidPassword(isValid);
  };

  return (
    <div className="container-registro">
      <form onSubmit={handleSubmit}>
        <Usuario />
        <div className="div-form">
          <input
            type="text"
            value={name}
            placeholder="Ingrese su nombre"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="div-form">
          <input
            type="text"
            value={lastName}
            placeholder="Ingrese su apellido"
            onChange={(event) => setApellido(event.target.value)}
          />
        </div>
        <div className="div-form">
          <input
            type="text"
            value={numero}
            placeholder="Ingrese su numero de telefono"
            onChange={(event) => setNumero(event.target.value)}
          />
        </div>
        <div className="div-form">
          <input
            type="text"
            value={correo}
            placeholder="Ingrese un correo"
            onChange={(event) => setCorreo(event.target.value)}
          />
        </div>
        <div className="div-form">
          <input
            type="password"
            placeholder="Ingrese una contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isValidPassword && (
            <div style={{ color: "red"}}>
            </div>
          )}
        </div>
        <div className="div-form">
          <input
            type="password"
            placeholder="Ingrese la confirmacion de su contraseña"
            value={confirmpassword}
            onChange={(event) => confirmsetPassword(event.target.value)}
          />
        </div>
        <div className="div-form">
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(event) => setFecha(event.target.value)}
          />
        </div>
        <button onClick={registrar} type="submit">
          Registrarse
        </button>
        <p>
          ¿Ya tienes una cuenta? <button onClick={Login}>Inicia Sesion</button>
        </p>
      </form>
    </div>
  );
};

export default Registro;
