import React, { useState } from 'react';
import './Login.css';
import logo from '../Imagenes/Logocompleto.jpg'; // Asegúrate de que la ruta sea correcta


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
      <div className="logo-container2">
      <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        </div>
        <br></br>
        <br></br>
        <div className='alinear'>
          <h1>INICIA SESIÓN</h1>
          <p>para continuar</p>
          <form onSubmit={handleLogin}>
            <div className='input-container'>
              <label htmlFor="usuario" className='input-label'> 
              </label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                className="input-field"
                placeholder="Usuario"
              />    
            </div>
            <div className='input-container'>
              <label htmlFor="password" className='input-label'>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="Contraseña"
              />
            </div>
            <button type="submit">INGRESAR</button>
          </form>
            
        </div>
        
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
