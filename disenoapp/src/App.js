import React, { useState } from "react";
import Login from "./Componentes/admin/Login";
import Cliente from "./Componentes/cliente/cliente";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clientes" element={<Cliente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
