import React, { useState, useRef, useEffect } from 'react';
import './cliente.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BACKEND_API } from '../../constant';

const Registro = () => {
  const [nombre_cliente, setNombre] = useState("");
  const [apellido_cliente, setApellido] = useState("");
  const [telefono_cliente, setTelefono] = useState("");
  const [errorCliente, setErrorCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${BACKEND_API}api/clientes`);
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    fetchClientes();
  }, []);
  

  const handleEliminarCliente = async (id) => {
    try {
      await axios.delete(`${BACKEND_API}api/cliente/${id}`);
      toast.success('¡Cliente eliminado exitosamente!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        window.location.reload();
    }, 800);
      
    } catch (error) {
      console.error("Error al eliminar el Cliente:", error);
    }
  };

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
      setTimeout(() => {
        window.location.reload();
    }, 500);
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
      <div className="form-row">
        <div className="form-group">
          <label className="label" htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            className="input small"
            value={nombre_cliente}
            name="nombre_cliente"
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            className="input small"
            value={apellido_cliente}
            name="apellido_cliente"
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
      </div>

      
      <div className="form-group-full">
        <label className="label" htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          className="input small"
          value={telefono_cliente}
          name="telefono_cliente"
          onChange={(e) => setTelefono(e.target.value)}
        />
        {errorCliente && <span className="error" style={{ color: "red" }}>{errorCliente}</span>}
        <button type="submit" onClick={handleSubmit}>Guardar Cliente</button>
      </div>

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
      
      <div className="cliente-tabla">
        <h2>Clientes Actuales</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nombre_cliente}</td>
                <td>{cliente.apellido_cliente}</td>
                <td>{cliente.telefono_cliente}</td>
                <td>
                  <button onClick={() => handleEliminarCliente(cliente.id_cliente)}>Eliminar</button>
                  <button>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registro;
