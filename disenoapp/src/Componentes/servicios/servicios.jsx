import React, { useState, useEffect } from 'react';
import './servicios.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BACKEND_API } from '../../constant';

const servicios = () => {
    const [nombre_servicio, setNombre_ser] = useState("");
  const [costo_servicio, setcosto] = useState("");
  const [duracion_servicio, setduracion] = useState("");
  const [errorservicio, setErrorServicio] = useState("");
  const [servicios, setServicio] = useState([]);
  const [showMod, setshowMod] = useState(false);
  const [servicioModificar, setservicioModificar] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${BACKEND_API}api/servicio`);
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleEliminarServicio = async (id) => {
    try {
      await axios.delete(`${BACKEND_API}api/servivio/${id}`);
      toast.success('¡Servicio eliminado exitosamente!', {
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
      console.error("Error al eliminar el servicio:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorservicio) {
      toast.error(errorservicio, {
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
      await axios.post(`${BACKEND_API}api/servicio`, { nombre_servicio, duracion_servicio, costo_servicio });
      toast.success('¡Servicio registrado exitosamente!', {
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
      console.error('Error al registrar el servicio:', error);
      toast.error('¡Error al registrar el servicio!', {
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

  const handleModificar = (servicio) => {
    setClienteModificar(servicio);
    setshowMod(true);
  };

  const handleCloseModificar = () => {
    setshowMod(false);
    setservicioModificar(null);
  };

  const handleModificarServicio = async () => {
    try {
      await axios.put(`${BACKEND_API}api/actualizar-Servicio/${servicioModificar.id_servicio}`, servicioModificar);
      toast.success('¡Servicio modificado exitosamente!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      setshowMod(false);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("Error al modificar el servicio:", error);
      toast.error('¡Error al modificar el servicio!', {
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
          <h2>Registro de Servicio</h2>
          <div className="form-row">
            <div className="form-group">
              <label className="label" htmlFor="nombre">Nombre del servicio:</label>
              <input
                type="text"
                id="nombreServicio"
                className="input small"
                value={nombre_servicio}
                name="nombre_servicio"
                onChange={(e) => setNombre_ser(e.target.value)}
                required
              />
            </div>
    
            <div className="form-group">
              <label className="label" htmlFor="duracion">Duración:</label>
              <input
                type="text"
                id="duracion"
                className="input small"
                value={duracion_servicio}
                name="duracion_servicio"
                onChange={(e) => setduracion(e.target.value)}
                required
              />
            </div>
          </div>
    
          <div className="form-group-full">
            <label className="label" htmlFor="costo">Costo:</label>
            <input
              type="text"
              id="costo"
              className="input small"
              value={costo_servicio}
              name="costo_servicio"
              onChange={(e) => setcosto(e.target.value)}
            />
            {errorCliente && <span className="error" style={{ color: "red" }}>{errorservicio}</span>}
            <button type="submit" onClick={handleSubmit} className="button-client">Guardar Servicio</button>
          </div>
    
          <ToastContainer />
    
          <div className="cliente-tabla">
            <h2>Clientes Actuales</h2>
            <table>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Duración</th>
                  <th>Costo</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((servicio, index) => (
                  <tr key={index}>
                    <td>{servicios.nombre_servicio}</td>
                    <td>{servicios.duracion_servicio}</td>
                    <td>{servicios.costo_servicio}</td>
                    <td>
                      <button className="button-client" onClick={() => handleEliminarCliente(servicios.id_)}>Eliminar</button>
                      <button className="button-client" onClick={() => handleModificar(servicios)}>Modificar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {showMod && (
            <div className="Modificar">
              <div className="Modificar-content">
                <h3>Modificar servicio</h3>
                Servicio 
                <input
                  type="text"
                  value={servicioModificar.nombre_servicio}
                  onChange={(e) => setClienteModificar({ ...servicioModificar, nombre_servicio: e.target.value })}
                  placeholder="Nombre_ser"
                />
                Duración
                <input
                  type="text"
                  value={servicioModificar.duracion_servicio}
                  onChange={(e) => setClienteModificar({ ...servicioModificar, duracion_servicio: e.target.value })}
                  placeholder="duracion"
                />
                Costo
                <input
                  type="text"
                  value={servicioModificar.costo_servicio}
                  onChange={(e) => setClienteModificar({ ...servicioModificar, costo_servicio: e.target.value })}
                  placeholder="costo"
                />
                <button onClick={handleModificarServicio} className="button-client">Guardar Cambios</button>
                <button onClick={handleCloseModificar} className="button-client">Cancelar</button>
              </div>
            </div>
          )}
        </div>
      );
};

export default servicios;