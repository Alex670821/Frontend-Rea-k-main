import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/LoginRegister/LoginRegister';
import Stream from './componentes/Stream';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stream" element={<Stream />} />
      </Routes>
    </Router>
  );
};

export default App;
