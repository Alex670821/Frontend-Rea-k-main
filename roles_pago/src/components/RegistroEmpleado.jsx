import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RegistroEmpleado = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Valores iniciales del formulario
  const initialValues = {
    nombre_apellido: '',
    cedula: '',
    linea: '',
    cargo: '',
    departamento: '',
    afiliado: false,
    ruc: '',
    fecha_entrada: '',
    fecha_salida: '',
    dias_trabajados: 0,
    sueldo_iess: 0,
    sueldo_ganado: 0,
    horas_suplementarias: 0,
    total_suplementarias: 0,
    horas_extraordinarias: 0,
    total_extraordinarias: 0,
    comisiones: 0,
    total_aportable: 0,
    horas_extras: 0,
    movilidad_ca: 0,
    fondos_reserva_recibe: 0,
    fondos_reserva_acumula: 0,
    total_ingresos: 0,
    iess: 0,
    anticipos_febrero: 0,
    descuentos: 0,
    prestamos_iess: 0,
    prestamos_empleados: 0,
    multas: 0,
    compras_consumos: 0,
    pension_alimentos: 0,
    total_egresos: 0,
    a_pagar: 0,
    banco: '',
    cuenta: '',
    mes: '', // Nuevo campo para el mes
    anio: 0  // Nuevo campo para el año
  };

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    nombre_apellido: Yup.string().required('Campo obligatorio'),
    cedula: Yup.string().required('Campo obligatorio'),
    sueldo_ganado: Yup.number().required('Campo obligatorio'),
    total_aportable: Yup.number().required('Campo obligatorio'),
  });

  // Función para enviar el formulario
  const onSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/empleados', values);
      alert('Empleado registrado con éxito');
      navigate('/');
    } catch (error) {
      console.error('Error al registrar el empleado:', error);
      setError('Error al registrar el empleado');
      setShowModal(true);
    }
  };

  // Cerrar el modal de errores
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Registro de Empleado</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Sección 1: Información básica */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre y Apellido</label>
                <Field type="text" name="nombre_apellido" className="form-control" />
                <ErrorMessage name="nombre_apellido" component="div" className="text-danger" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Cédula</label>
                <Field type="text" name="cedula" className="form-control" />
                <ErrorMessage name="cedula" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Línea</label>
                <Field type="text" name="linea" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Cargo</label>
                <Field type="text" name="cargo" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Departamento</label>
                <Field type="text" name="departamento" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Afiliado</label>
                <Field type="checkbox" name="afiliado" className="form-check-input" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">RUC</label>
                <Field type="text" name="ruc" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Fecha de Entrada</label>
                <Field type="date" name="fecha_entrada" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Fecha de Salida</label>
                <Field type="date" name="fecha_salida" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Días Trabajados</label>
                <Field type="number" name="dias_trabajados" className="form-control" />
              </div>
            </div>

            {/* Sección 2: Sueldos y Horas */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Sueldo IESS</label>
                <Field type="number" name="sueldo_iess" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Sueldo Ganado</label>
                <Field type="number" name="sueldo_ganado" className="form-control" />
                <ErrorMessage name="sueldo_ganado" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Horas Suplementarias</label>
                <Field type="number" name="horas_suplementarias" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Total Suplementarias</label>
                <Field type="number" name="total_suplementarias" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Horas Extraordinarias</label>
                <Field type="number" name="horas_extraordinarias" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Total Extraordinarias</label>
                <Field type="number" name="total_extraordinarias" className="form-control" />
              </div>
            </div>

            {/* Sección 3: Comisiones y Aportes */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Comisiones</label>
                <Field type="number" name="comisiones" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Total Aportable</label>
                <Field type="number" name="total_aportable" className="form-control" />
                <ErrorMessage name="total_aportable" component="div" className="text-danger" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Horas Extras</label>
                <Field type="number" name="horas_extras" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Movilidad y CA</label>
                <Field type="number" name="movilidad_ca" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Fondos Reserva (Recibe)</label>
                <Field type="number" name="fondos_reserva_recibe" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Fondos Reserva (Acumula)</label>
                <Field type="number" name="fondos_reserva_acumula" className="form-control" />
              </div>
            </div>

            {/* Sección 4: Ingresos y Egresos */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Total Ingresos</label>
                <Field type="number" name="total_ingresos" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">IESS (9.45%)</label>
                <Field type="number" name="iess" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Anticipos Febrero</label>
                <Field type="number" name="anticipos_febrero" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Descuentos</label>
                <Field type="number" name="descuentos" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Préstamos IESS</label>
                <Field type="number" name="prestamos_iess" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Préstamos Empleados</label>
                <Field type="number" name="prestamos_empleados" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Multas</label>
                <Field type="number" name="multas" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Compras/Consumos</label>
                <Field type="number" name="compras_consumos" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Pensión de Alimentos</label>
                <Field type="number" name="pension_alimentos" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Total Egresos</label>
                <Field type="number" name="total_egresos" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">A Pagar</label>
                <Field type="number" name="a_pagar" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Banco</label>
                <Field type="text" name="banco" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Cuenta</label>
                <Field type="text" name="cuenta" className="form-control" />
              </div>
            </div>

            <div className="row">
    <div className="col-md-6 mb-3">
      <label className="form-label">Mes</label>
      <Field as="select" name="mes" className="form-control">
        <option value="Enero">Enero</option>
        <option value="Febrero">Febrero</option>
        <option value="Marzo">Marzo</option>
        <option value="Abril">Abril</option>
        <option value="Mayo">Mayo</option>
        <option value="Junio">Junio</option>
        <option value="Julio">Julio</option>
        <option value="Agosto">Agosto</option>
        <option value="Septiembre">Septiembre</option>
        <option value="Octubre">Octubre</option>
        <option value="Noviembre">Noviembre</option>
        <option value="Diciembre">Diciembre</option>
      </Field>
    </div>
    <div className="col-md-6 mb-3">
      <label className="form-label">Año</label>
      <Field type="number" name="anio" className="form-control" />
    </div>
  </div>

            {/* Botón de envío */}
            <div className="text-center">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>

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

export default RegistroEmpleado;