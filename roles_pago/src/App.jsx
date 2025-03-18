import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import RegistroEmpleado from './components/RegistroEmpleado.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registro" element={<RegistroEmpleado />} />
      </Routes>
    </Router>
  );
};

export default App;