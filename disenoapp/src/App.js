import React, { useState } from 'react';
import Login from './Componentes/Login';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <Login></Login>
    </div>
  );
}

export default App;