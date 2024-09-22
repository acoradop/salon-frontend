import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el locale en español
import axios from "axios";
import "./calendario.css";
import { BACKEND_API } from "../../constant";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";


dayjs.locale('es');

const Calendario = () => {
  const localizer = dayjsLocalizer(dayjs);
  const [events, setEvents] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedServicio, setSelectedServicio] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStartTime, setEditStartTime] = useState("");
  const [editService, setEditService] = useState("");
  const [editCliente, setEditCliente] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesResponse = await axios.get(`${BACKEND_API}api/clientes`);
        setClientes(clientesResponse.data);

        const serviciosResponse = await axios.get(`${BACKEND_API}api/servicios`);
        setServicios(serviciosResponse.data);

        const citasResponse = await axios.get(`${BACKEND_API}api/citas`);
        const citasData = citasResponse.data.map((cita) => ({
          id: cita.id_cita,
          title: `Cita con ${clientes.find((c) => c.id_cliente === cita.id_cliente)?.nombre_cliente}`,
          start: new Date(`${cita.fecha_cita.split("T")[0]}T${cita.hora_inicio_cita}`),
          end: new Date(`${cita.fecha_cita.split("T")[0]}T${cita.hora_fin_cita}`),
          id_cliente: cita.id_cliente,
          id_servicio: cita.id_servicio,
        }));
        setEvents(citasData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsOpen(true);
    setIsTimeSelected(false);
    setSelectedTime("");
  };

  const handleSelectTime = (e) => {
    setSelectedTime(e.target.value);
    setIsTimeSelected(true);
  };

  const handleCreateCita = async () => {
    if (selectedCliente && selectedServicio && selectedTime) {
      const servicio = servicios.find((s) => s.id_servicio === parseInt(selectedServicio));
      const duracionServicio = servicio ? servicio.duracion_servicio : 0;
      const startDateTime = new Date(selectedDate);
      startDateTime.setHours(parseInt(selectedTime.split(":")[0]));
      startDateTime.setMinutes(parseInt(selectedTime.split(":")[1]));

      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(endDateTime.getMinutes() + duracionServicio);

      const overlapping = events.some((event) => {
        return startDateTime < event.end && endDateTime > event.start;
      });

      if (overlapping) {
        toast({
          title: "Hora ocupada",
          description: "Ya existe una cita en el rango de tiempo seleccionado.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      try {
        await axios.post(`${BACKEND_API}api/cita`, {
          fecha_cita: startDateTime.toISOString().split("T")[0],
          hora_inicio_cita: startDateTime.toTimeString().split(" ")[0],
          hora_fin_cita: endDateTime.toTimeString().split(" ")[0],
          id_cliente: selectedCliente,
          id_servicio: selectedServicio,
        });
        toast({
          title: "Cita Agendada",
          description: "La cita se ha agendado correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            id: prevEvents.length + 1,
            title: `Cita con ${clientes.find((c) => c.id_cliente === parseInt(selectedCliente))?.nombre_cliente}`,
            start: startDateTime,
            end: endDateTime,
            id_cliente: parseInt(selectedCliente),
            id_servicio: parseInt(selectedServicio),
          },
        ]);
        setIsOpen(false);
        setSelectedTime("");
        setIsTimeSelected(false);
      } catch (error) {
        console.error("Error al agendar la cita:", error);
        toast({
          title: "Error al Agendar Cita",
          description: "Ocurrió un error al intentar agendar la cita. Inténtalo de nuevo.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEditStartTime(event.start.toTimeString().split(' ')[0]);
    setEditService(event.id_servicio);
    setEditEndTime(event.end.toTimeString().split(' ')[0]);
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenEditModal = () => {
    setIsEventModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateCita = async () => {
    if (selectedEvent && editStartTime && editService) {
      const servicio = servicios.find((s) => s.id_servicio === parseInt(editService));
      const duracionServicio = servicio ? servicio.duracion_servicio : 0;
      const startDateTime = new Date(selectedEvent.start);
      const endDateTime = new Date(startDateTime);
      startDateTime.setHours(parseInt(editStartTime.split(":")[0]));
      startDateTime.setMinutes(parseInt(editStartTime.split(":")[1]));
      endDateTime.setMinutes(endDateTime.getMinutes() + duracionServicio);

      const overlapping = events.some((event) => {
        return (
          event.id !== selectedEvent.id && 
          startDateTime < event.end &&
          endDateTime > event.start
        );
      });

      if (overlapping) {
        toast({
          title: "Hora ocupada",
          description: "Ya existe una cita en el rango de tiempo seleccionado.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      try {
        await axios.put(`${BACKEND_API}api/cita/${selectedEvent.id}`, {
          fecha_cita: startDateTime.toISOString().split("T")[0],
          hora_inicio_cita: startDateTime.toTimeString().split(" ")[0],
          hora_fin_cita: endDateTime.toTimeString().split(" ")[0],
          id_cliente: editCliente || selectedEvent.id_cliente, 
          id_servicio: editService, 
        });
        toast({
          title: "Cita Actualizada Correctamente",
          description: "La cita se ha agendado correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id
              ? {
                  ...event,
                  start: startDateTime,
                  end: endDateTime,
                  id_cliente: selectedCliente,
                  id_servicio: selectedServicio,
                  title: `Cita con ${clientes.find((c) => c.id_cliente === selectedCliente)?.nombre_cliente}`,
                }
              : event
          )
        );
        setIsEditModalOpen(false);
      } catch (error) {
        console.error("Error al actualizar la cita:", error);
        toast({
          title: "Error al Actualizar la cita Cita",
          description: "Ocurrió un error al intentar agendar la cita. Inténtalo de nuevo.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleDeleteCita = async () => {
    if (selectedEvent) {
      try {
        await axios.delete(`${BACKEND_API}api/cita/${selectedEvent.id}`);
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== selectedEvent.id)
        );
        setIsEventModalOpen(false);
        toast({
          title: "Cita Eliminada correctamente",
          description: "La cita se ha eliminado sin problema alguno",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } 
      
      catch (error) {
        console.error("Error al eliminar la cita:", error);
      }
    }
  };

  const timeOptions = [];
  for (let hour = 9; hour < 18; hour++) {
    timeOptions.push(`${hour}:00`);
    timeOptions.push(`${hour}:30`);
  }

  return (
    <div style={{ height: 600 }} className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "800px", width:'950px' }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={['month', 'day','agenda']}
        messages={{
          allDay: 'Todo el día',
          previous: 'Anterior',
          next: 'Siguiente',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'No hay eventos en este rango de fechas.',
          showMore: (total) => `+ Ver más (${total})`,
        }}
      />

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Agendar Cita</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select
                placeholder="Seleccione Cliente"
                onChange={(e) => setSelectedCliente(e.target.value)}
              >
                {clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.nombre_cliente} {cliente.apellido_cliente}
                  </option>
                ))}
              </Select>

              <Select
                placeholder="Seleccione Servicio"
                onChange={(e) => setSelectedServicio(e.target.value)}
                mt={4}
              >
                {servicios.map((servicio) => (
                  <option
                    key={servicio.id_servicio}
                    value={servicio.id_servicio}
                  >
                    {servicio.nombre_servicio} - {servicio.duracion_servicio} minutos
                  </option>
                ))}
              </Select>

              {!isTimeSelected && (
                <Select
                  placeholder="Seleccione Hora"
                  onChange={handleSelectTime}
                  mt={4}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={handleCreateCita}>
                Guardar Cita
              </Button>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {isEventModalOpen && selectedEvent && (
        <Modal isOpen={isEventModalOpen} onClose={handleCloseEventModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detalles de la Cita</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p style={{ color: "black", fontSize: "14px" }}>
                <strong>Cliente:</strong> {clientes.find((c) => c.id_cliente === selectedEvent.id_cliente)?.nombre_cliente} {clientes.find((c) => c.id_cliente === selectedEvent.id_cliente)?.apellido_cliente}
              </p>
              <p style={{ color: "black", fontSize: "14px" }}>
                <strong>Servicio:</strong> {servicios.find((s) => s.id_servicio === selectedEvent.id_servicio)?.nombre_servicio} {servicios.find((s) => s.id_servicio === selectedEvent.id_servicio)?.duracion_servicio}-minutos Q{servicios.find((s) => s.id_servicio === selectedEvent.id_servicio)?.costo_servicio}
              </p>
              <p style={{ color: "black", fontSize: "14px" }}>
                <strong>Fecha:</strong> {selectedEvent.start.toDateString()}
              </p>
              <p style={{ color: "black", fontSize: "14px" }}>
                <strong>Hora de Inicio:</strong> {selectedEvent.start.toLocaleTimeString()}
              </p>
              <p style={{ color: "black", fontSize: "14px" }}>
                <strong>Hora de Fin:</strong> {selectedEvent.end.toLocaleTimeString()}
              </p>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={handleOpenEditModal}>
                Modificar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteCita}>
                Eliminar
              </Button>
              <Button variant="ghost" onClick={handleCloseEventModal}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

{isEditModalOpen && (
  <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modificar Cita</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Select
          value={editCliente || selectedEvent.id_cliente} 
          onChange={(e) => {
            setEditCliente(e.target.value);
          }}
          placeholder="Seleccione Cliente"
        >
          {clientes.map((cliente) => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>
              {cliente.nombre_cliente} {cliente.apellido_cliente}
            </option>
          ))}
        </Select>

        <Select
          value={editService}
          onChange={(e) => {
            const selectedService = e.target.value;
            setEditService(selectedService);
            const servicio = servicios.find((s) => s.id_servicio === parseInt(selectedService));
            const duracionServicio = servicio ? servicio.duracion_servicio : 0;

            const newEndTime = new Date(selectedEvent.start);
            newEndTime.setHours(parseInt(editStartTime.split(":")[0]));
            newEndTime.setMinutes(parseInt(editStartTime.split(":")[1]));
            newEndTime.setMinutes(newEndTime.getMinutes() + duracionServicio);
            setEditEndTime(newEndTime.toTimeString().split(" ")[0]);
          }}
          placeholder="Seleccione Servicio"
          mt={4}
        >
          {servicios.map((servicio) => (
            <option key={servicio.id_servicio} value={servicio.id_servicio}>
              {servicio.nombre_servicio} - {servicio.duracion_servicio} minutos
            </option>
          ))}
        </Select>

        <Select
          value={editStartTime|| selectedEvent.hora_inicio_cita} 
          onChange={(e) => {
            setEditStartTime(e.target.value);
            const servicio = servicios.find((s) => s.id_servicio === parseInt(editService));
            const duracionServicio = servicio ? servicio.duracion_servicio : 0;

            const newStartTime = new Date(selectedEvent.start);
            newStartTime.setHours(parseInt(e.target.value.split(":")[0]));
            newStartTime.setMinutes(parseInt(e.target.value.split(":")[1]));

            const newEndTime = new Date(newStartTime);
            newEndTime.setMinutes(newStartTime.getMinutes() + duracionServicio);
            setEditEndTime(newEndTime.toTimeString().split(" ")[0]);
          }}
          placeholder="Seleccione Hora de Inicio"
          mt={4}
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>

        <p style={{ color: "black", fontSize: "14px" }}>
          <strong>Hora de Fin:</strong> {editEndTime}
        </p>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" onClick={handleUpdateCita}>
          Guardar Cambios
        </Button>
        <Button variant="ghost" onClick={handleCloseEditModal}>
          Cancelar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)}



    </div>
  );
};

export default Calendario;

