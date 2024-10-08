import React, { useState, useEffect } from 'react';
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
  const [showMod, setshowMod] = useState(false);
  const [clienteModificar, setClienteModificar] = useState(null);

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

  const validarTexto = (texto) => /^[a-zA-Z\s]+$/.test(texto);
  const validarTelefono = (telefono) => /^[0-9]+$/.test(telefono);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarTexto(nombre_cliente)) {
      toast.error('El nombre solo debe contener letras.', { position: "bottom-center", theme: "dark" });
      return;
    }

    if (!validarTexto(apellido_cliente)) {
      toast.error('El apellido solo debe contener letras.', { position: "bottom-center", theme: "dark" });
      return;
    }

    if (!validarTelefono(telefono_cliente)) {
      toast.error('El teléfono solo debe contener números.', { position: "bottom-center", theme: "dark" });
      return;
    }

    try {
      await axios.post(`${BACKEND_API}api/cliente`, { nombre_cliente, apellido_cliente, telefono_cliente });
      toast.success('¡Cliente registrado exitosamente!', { position: "bottom-center", theme: "dark" });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
      toast.error('¡Error al registrar el cliente!', { position: "bottom-center", theme: "dark" });
    }
  };

  const handleModificar = (cliente) => {
    setClienteModificar(cliente);
    setshowMod(true);
  };

  const handleCloseModificar = () => {
    setshowMod(false);
    setClienteModificar(null);
  };

  const handleModificarCliente = async () => {
    if (!validarTexto(clienteModificar.nombre_cliente)) {
      toast.error('El nombre solo debe contener letras.', { position: "bottom-center", theme: "dark" });
      return;
    }

    if (!validarTexto(clienteModificar.apellido_cliente)) {
      toast.error('El apellido solo debe contener letras.', { position: "bottom-center", theme: "dark" });
      return;
    }

    if (!validarTelefono(clienteModificar.telefono_cliente)) {
      toast.error('El teléfono solo debe contener números.', { position: "bottom-center", theme: "dark" });
      return;
    }

    try {
      await axios.put(`${BACKEND_API}api/actualizar-cliente/${clienteModificar.id_cliente}`, clienteModificar);
      toast.success('¡Cliente modificado exitosamente!', { position: "bottom-center", theme: "dark" });
      setshowMod(false);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("Error al modificar el cliente:", error);
      toast.error('¡Error al modificar el cliente!', { position: "bottom-center", theme: "dark" });
    }
  };

  return (
    <div className='register-container'>
      <h2>Clientes</h2>
      <br></br><br></br>
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
        <div className="input-button-group">
          <input
            type="text"
            id="telefono"
            className="input small"
            value={telefono_cliente}
            name="telefono_cliente"
            onChange={(e) => setTelefono(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit} className="button-client">Guardar Cliente</button>
        </div>
      </div>

      <ToastContainer />

      <div className="cliente-tabla">
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
                  <button className="button-client" onClick={() => handleEliminarCliente(cliente.id_cliente)}>Eliminar</button>
                  <button className="button-client" onClick={() => handleModificar(cliente)}>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showMod && (
        <div className="Modificar">
          <div className="Modificar-content">
            <h3>Modificar Cliente</h3>
            Nombre
            <input
              type="text"
              value={clienteModificar.nombre_cliente}
              onChange={(e) => setClienteModificar({ ...clienteModificar, nombre_cliente: e.target.value })}
              placeholder="Nombre"
            />
            Apellido
            <input
              type="text"
              value={clienteModificar.apellido_cliente}
              onChange={(e) => setClienteModificar({ ...clienteModificar, apellido_cliente: e.target.value })}
              placeholder="Apellido"
            />
            Telefono
            <input
              type="text"
              value={clienteModificar.telefono_cliente}
              onChange={(e) => setClienteModificar({ ...clienteModificar, telefono_cliente: e.target.value })}
              placeholder="Teléfono"
            />
            <button onClick={handleModificarCliente} className="button-client">Guardar Cambios</button>
            <button onClick={handleCloseModificar} className="button-client">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registro;