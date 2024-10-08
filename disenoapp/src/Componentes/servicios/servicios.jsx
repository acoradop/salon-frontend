import React, { useState, useEffect } from 'react';
import './servicios.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BACKEND_API } from '../../constant';

const Servicios = () => {
  const [nombre_servicio, setNombre_ser] = useState("");
  const [costo_servicio, setcosto] = useState("");
  const [duracion_servicio, setduracion] = useState("");
  const [errorservicio, setErrorServicio] = useState("");
  const [servicios, setServicio] = useState([]);
  const [showMod, setshowMod] = useState(false);
  const [servicioModificar, setservicioModificar] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const response = await axios.get(`${BACKEND_API}api/servicios`);
        setServicio(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchServicio();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setduracion(selectedValue);
  };

  const validateServiceName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const validateCost = (cost) => {
    const regex = /^[0-9]+$/;
    return regex.test(cost);
  };

  const handleEliminarServicio = async (id) => {
    try {
      await axios.delete(`${BACKEND_API}api/servicio/${id}`);
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
    if (!validateServiceName(nombre_servicio)) {
      toast.error('El nombre del servicio solo puede contener letras.', {
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

    if (!validateCost(costo_servicio)) {
      toast.error('El costo debe ser un número válido.', {
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

    if (!duracion_servicio) {
      toast.error('Debes seleccionar una duración.', {
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
    setservicioModificar(servicio);
    setshowMod(true);
  };

  const handleCloseModificar = () => {
    setshowMod(false);
    setservicioModificar(null);
  };

  const handleModificarServicio = async () => {
    try {
      await axios.put(`${BACKEND_API}api/servicio/${servicioModificar.id_servicio}`, servicioModificar);
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
      <h2>Servicio</h2>
      <br /><br />
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
          <select id="services" value={selectedOption} onChange={handleChange}>
            <option value="">--Selecciona una opción--</option>
            <option value="60">1 Hora</option>
            <option value="120">2 Horas</option>
            <option value="180">3 Horas</option>
            <option value="240">4 Horas</option>
          </select>
        </div>
      </div>

      <div className="form-group-full">
        <label className="label" htmlFor="costo">Costo:</label>
        <div className="input-button-group">
          <input
            type="text"
            id="costo"
            className="input small"
            value={costo_servicio}
            name="costo_servicio"
            onChange={(e) => setcosto(e.target.value)}
          />
          {errorservicio && <span className="error" style={{ color: "red" }}>{errorservicio}</span>}
          <button type="submit" onClick={handleSubmit} className="button-server">Guardar Servicio</button>
        </div>
      </div>

      <ToastContainer />

      <div className="server-tabla">
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
                <td>{servicio.nombre_servicio}</td>
                <td>{servicio.duracion_servicio}</td>
                <td>{servicio.costo_servicio}</td>
                <td>
                  <button className="button-server" onClick={() => handleEliminarServicio(servicio.id_servicio)}>Eliminar</button><br />
                  <button className="button-server" onClick={() => handleModificar(servicio)}>Modificar</button>
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
            <input
              type="text"
              value={servicioModificar.nombre_servicio}
              onChange={(e) => setservicioModificar({ ...servicioModificar, nombre_servicio: e.target.value })}
              placeholder="Nombre del Servicio"
            />
            <select
              value={servicioModificar.duracion_servicio}
              onChange={(e) => setservicioModificar({ ...servicioModificar, duracion_servicio: e.target.value })}
            >
              <option value="">Seleccionar duración</option>
              <option value="60">1 Hora</option>
              <option value="120">2 Horas</option>
              <option value="180">3 Horas</option>
              <option value="240">4 Horas</option>
            </select>
            <input
              type="text"
              value={servicioModificar.costo_servicio}
              onChange={(e) => setservicioModificar({ ...servicioModificar, costo_servicio: e.target.value })}
              placeholder="Costo del Servicio"
            />
            <div>
              <button className="button-server" onClick={handleModificarServicio}>Guardar</button>
              <button className="button-server" onClick={handleCloseModificar}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicios;
