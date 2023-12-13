import React, { useState } from 'react';
import Swal from 'sweetalert2';

import Service from "../services/Service.js";
import ImageComponent from '../components/ImageComponent';

import './Styles/Login.css';

var SHA256 = require("crypto-js/sha256");

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState("");


  const info = () => {
    Service.ping().then((response) => {
      console.log(response);
    });
  };


  const getUsers = (e) => {
    fetch(`http://localhost:4000/usuario/login/${username}`, {
      method:"POST",
      headers:{
          'Content-Type': 'application/json'
      },body: JSON.stringify({
        password: password,
      }),
  })
  .then(res => res.json())
  .catch(err =>{
      console.log('Error:',err);
  })
  .then(response => {
      console.log(response);
      if (response.message == "Usuario o Contraseña Incorrectos"){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o Contraseña Incorrectos",
        });
      }else{
        if (response.administrador == 1){
          localStorage.setItem('usuario', JSON.stringify(response.email));
          window.location.href = "http://localhost:3000/AdministracionLibros";
        }else{
          localStorage.setItem('usuario', JSON.stringify(response.email));
          window.location.href = "http://localhost:3000/usuarios";
        }
      }

  })
};
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    window.location.href = "http://localhost:3000/RegisterForm"
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <ImageComponent />
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
          placeholder="Ingrese su username"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          placeholder="Ingrese su contraseña"
        />
        <button onClick={getUsers} type="submit">Iniciar sesión</button>
         <p>¿No tienes una cuenta? <button onClick={handleRegister}>Registrate</button></p>
      </form>
    </div>
  );
};

export default Login;