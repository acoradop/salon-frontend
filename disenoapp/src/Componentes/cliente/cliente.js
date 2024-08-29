import React, { useState, useRef } from 'react';
import './cliente.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BACKEND_API } from '../../constant';

const Registro = () => {
  const [nombre_cliente, setNombre] = useState("");
  const [apellido_cliente, setApellido] = useState("");
  const [telefono_cliente, setTelefono] = useState("");
  const [errorCliente, setErrorCliente] = useState("");
  const form = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorCliente) {
      toast.error(errorCliente, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      await axios.post(`${BACKEND_API}api/cliente`, { nombre_cliente, apellido_cliente, telefono_cliente });
      toast.success('¡Cliente registrado exitosamente!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
      toast.error('¡Error al registrar el cliente!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className='register-container'>
      <h2>Registro de Clientes</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="campo-formulario">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre_cliente}
            name="nombre_cliente"
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="campo-formulario">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido_cliente}
            name="apellido_cliente"
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="campo-formulario">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            value={telefono_cliente}
            name="telefono_cliente"
            onChange={(e) => setTelefono(e.target.value)}
            
          />
          {errorCliente && <span className="error" style={{ color: "red" }}>{errorCliente}</span>}
        </div>
        
        <button type="submit">Guardar Cliente</button>
      </form>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Registro;
