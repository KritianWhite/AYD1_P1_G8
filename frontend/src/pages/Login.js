import React, { useState } from 'react';
import './Styles/Login.css';
import ImageComponent from '../components/ImageComponent';

var SHA256 = require("crypto-js/sha256");

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const getUsers = (e) => {
    fetch("http://54.172.138.74:5000/api/getUsuarios", {
      method:"GET"
  })
  .then(res => res.json())
  .catch(err =>{
      console.log('Error:',err);
  })
  .then(response => {
      if (response){
        
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