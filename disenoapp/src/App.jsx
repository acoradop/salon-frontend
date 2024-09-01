import React, { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Nav from "./Componentes/nav/nav";
import Login from "./Componentes/admin/Login";
import Cliente from "./Componentes/cliente/cliente";
import Calendario from "./Componentes/calendario/calendario";
import Citas from "./Componentes/citas/citas";
import Servicios from "./Componentes/servicios/servicios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("SalonAdmin") === "true";
  });
  const location = useLocation();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("SalonAdmin", "true");
  };

  const showNav = isAuthenticated && location.pathname !== '/login' && location.pathname !== '/';

  return (
    <ChakraProvider>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        {isAuthenticated ? (
          <>
            <Route path="/clientes" element={<Cliente />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/servicios" element={<Servicios />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </ChakraProvider>
  );
}

export default App;
