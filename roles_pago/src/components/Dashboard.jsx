import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import VistaPreviaRol from './VistaPreviaRol';

const Dashboard = () => {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:5000/empleados');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      setError('Error al obtener empleados');
      setShowModal(true);
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/empleados/pdf/${id}`, {
        responseType: 'blob', // Asegúrate de usar 'blob' para descargar archivos binarios
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rol_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Limpia el enlace después de la descarga
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      setError('Error al descargar el PDF');
      setShowModal(true);
    }
  };

  const handleDownloadAllPDF = async () => {
    try {
      const response = await axios.get('http://localhost:5000/empleados/pdf', {
        responseType: 'blob', // Asegúrate de usar 'blob' para descargar archivos binarios
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'roles_todos.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Limpia el enlace después de la descarga
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      setError('Error al descargar el PDF');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard</h1>
      <div className="d-flex justify-content-between mb-4">
        <Link to="/registro" className="btn btn-primary">
          Registrar Nuevo Empleado
        </Link>
        <button onClick={handleDownloadAllPDF} className="btn btn-success">
          Descargar Todos los Roles
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre y Apellido</th>
            <th>Cédula</th>
            <th>Línea</th>
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.nombre_apellido}</td>
              <td>{empleado.cedula}</td>
              <td>{empleado.linea}</td>
              <td>{empleado.cargo}</td>
              <td>{empleado.departamento}</td>
              <td>
                <button
                  onClick={() => setSelectedEmpleado(empleado)}
                  className="btn btn-info btn-sm mr-2"
                >
                  Vista Previa
                </button>
                <button
                  onClick={() => handleDownloadPDF(empleado.id)}
                  className="btn btn-warning btn-sm"
                >
                  Descargar Rol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vista Previa del Rol */}
      {selectedEmpleado && (
        <div className="mt-4">
          <h2>Vista Previa del Rol</h2>
          <VistaPreviaRol empleado={selectedEmpleado} />
        </div>
      )}

      {/* Modal de errores */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;