import React, { useState } from 'react';
import './Login.css';
import logo from './Imagenes/Logo.jpg' // Asegúrate de que la ruta sea correcta
import user from './Imagenes/Logo.jpg';
import contraseña from './Imagenes/Logo.jpg';
import { BACKEND_API } from '../../constant';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (usuario === 'usuario' && password === '1234') {
      alert('Inicio de sesión exitoso');
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="background">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <form onSubmit={handleLogin}>
        <div className='input-container'>
          <label htmlFor="usuario" className='input-label'> 
            <img src={user} alt="Logo" />
          </label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="input-field"
            placeholder="Ingrese su usuario"
          />    
        </div>
        <div className='input-container'>
            <label htmlFor="password" className='input-label'>
            <img src={contraseña} alt="Logo" />
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Ingrese su contraseña"
            />
        </div>
        <br></br>
        <button type="submit">Ingresar</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
