import React, { useState } from "react";
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
    var numeroTelefono = numero;
    var correoElectronico = correo;
    var contra = password;
    var contra2 = confirmpassword;
    var fecha = fechaNacimiento;

    // Verificar si algún campo está vacío
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      numeroTelefono.trim() === "" ||
      correoElectronico.trim() === "" ||
      contra.trim() === "" ||
      contra2.trim() === "" ||
      fecha.trim() === ""
    ) {
      alert("Por favor, complete todos los campos.");
    } else {
      if (isValidPassword) {
        if (password === confirmpassword) {
          var Usuario = {
            nombre,
            apellido,
            numeroTelefono,
            correoElectronico,
            contra,
            contra2,
            fecha,
          };
          fetch("", {
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
                alert(
                  "El usuario " +
                    nombre +
                    apellido +
                    " fue registrado con exito."
                );
              } else {
                alert("Error: Hubo un error inesperado, intentelo denuevo.");
              }
            });
        } else {
          alert("Las contaseñas no coinciden, revise e intentelo denuevo.");
        }
      } else {
        alert(
          "Las contaseña debe de contener minimo 8 caracteres, una mayuscula y un numero."
        );
      }
    }
  };

  // Validacion de contraseña
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
        <div>
          <input
            type="text"
            value={name}
            placeholder="Ingrese su nombre"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            placeholder="Ingrese su apellido"
            onChange={(event) => setApellido(event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={numero}
            placeholder="Ingrese su numero de telefono"
            onChange={(event) => setNumero(event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={correo}
            placeholder="Ingrese un correo"
            onChange={(event) => setCorreo(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Ingrese una contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isValidPassword && (
            <div style={{ color: "red"}}>
              La contraseña debe tener al menos 8 caracteres, incluir una
              mayúscula y un número.
            </div>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Ingrese la confirmacion de su contraseña"
            value={confirmpassword}
            onChange={(event) => confirmsetPassword(event.target.value)}
          />
        </div>
        <div>
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
