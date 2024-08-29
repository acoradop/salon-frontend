import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from './Imagenes/Logocompleto.jpg'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BACKEND_API } from '../../constant';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userAdmin = localStorage.getItem('SalonAdmin');
    if (userAdmin) {
      navigate('/clientes');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_API}api/login`,
        {
          usuario_login: usuario,
          contrasena_login: contrasena,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response && response.data) {
        if (response.data.success) {
          const nombreUsuario = response.data.nombre || 'Anónimo';

          localStorage.setItem('SalonAdmin', nombreUsuario);

          toast.success(`Inicio de sesión exitoso. Bienvenido, ${nombreUsuario}!`, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark',
          });

          navigate('/clientes');
        } else {
          toast.error('Usuario o contraseña incorrectos', {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark',
          });
        }
      } else {
        console.error('Respuesta no válida:', response);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud', error);
      toast.error('Usuario o contraseña incorrectos', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
      });
    }

    setUsuario('');
    setContrasena('');
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
          <form onSubmit={handleSubmit}>
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
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                className="input-field"
                placeholder="Contraseña"
              />
            </div>
            <button type="submit">INGRESAR</button>
          </form>
            
        </div>
        <ToastContainer />
        
      </div>
    </div>
  );
}

export default Login;
