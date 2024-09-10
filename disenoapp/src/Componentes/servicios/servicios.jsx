import React, { useState } from 'react';
import './servicios.css';  // Asegúrate de enlazar el archivo CSS que te proporcioné
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Servicios = () => {
  const [nombre_servicio, setNombre_ser] = useState("");
  const [costo_servicio, setcosto] = useState("");
  const [duracion_servicio, setduracion] = useState("");
  const [errorservicio, setErrorServicio] = useState("");
  const [servicios, setServicio] = useState([]);
  const [showMod, setshowMod] = useState(false);
  const [servicioModificar, setservicioModificar] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setduracion(e.target.value); // Actualiza el estado de la duración con la selección
  };

  const handleSubmit = () => {
    if (!nombre_servicio || !costo_servicio || !duracion_servicio) {
      setErrorServicio("Todos los campos son obligatorios");
      return;
    }
    // Resetea el mensaje de error si todos los campos están completos
    setErrorServicio("");
    
    const nuevoServicio = {
      nombre_servicio,
      costo_servicio,
      duracion_servicio,
    };

    setServicio([...servicios, nuevoServicio]); // Agrega el nuevo servicio a la lista
    toast.success("Servicio guardado exitosamente");

    // Limpia los campos después de guardar
    setNombre_ser("");
    setcosto("");
    setduracion("");
    setSelectedOption("");
  };

  const handleEliminarServicio = (id_servicio) => {
    setServicio(servicios.filter(servicio => servicio.id_servicio !== id_servicio));
    toast.info("Servicio eliminado");
  };

  const handleModificar = (servicio) => {
    setservicioModificar(servicio);
    setshowMod(true);
  };

  const handleModificarServicio = () => {
    // Lógica para modificar el servicio
    setServicio(servicios.map(servicio => servicio.id_servicio === servicioModificar.id_servicio ? servicioModificar : servicio));
    setshowMod(false);
    toast.success("Servicio modificado");
  };

  const handleCloseModificar = () => {
    setshowMod(false);
  };

  return (
    <div className='register-container'>
      <h2>Servicio</h2>
      <br></br><br></br>
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
            <option value="1 hora">1 Hora</option>
            <option value="2 hora">2 Hora</option>
            <option value="3 hora">3 Hora</option>
            <option value="4 hora">4 Hora</option>
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
                  <button className="button-server" onClick={() => handleEliminarServicio(servicio.id_servicio)}>Eliminar</button><br></br>
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
            Servicio 
            <input
              type="text"
              value={servicioModificar.nombre_servicio}
              onChange={(e) => setservicioModificar({ ...servicioModificar, nombre_servicio: e.target.value })}
              placeholder="Nombre_ser"
            />
            Duración
            <input
              type="text"
              value={servicioModificar.duracion_servicio}
              onChange={(e) => setservicioModificar({ ...servicioModificar, duracion_servicio: e.target.value })}
              placeholder="duracion"
            />
            Costo
            <input
              type="text"
              value={servicioModificar.costo_servicio}
              onChange={(e) => setservicioModificar({ ...servicioModificar, costo_servicio: e.target.value })}
              placeholder="costo"
            />
            <button onClick={handleModificarServicio} className="button-server">Guardar Cambios</button>
            <button onClick={handleCloseModificar} className="button-server">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicios;
