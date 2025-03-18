import React from 'react';

const RolPago = ({ empleado }) => {
  const totalAportable = empleado.total_aportable;
  const iess = totalAportable * 0.0945; // 9.45% de IESS
  const liquidoRecibir = totalAportable - iess - empleado.descuentos;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">COMPROBANTE DE PAGO</h5>
        <p className="card-text">Empleado(a): {empleado.nombre_apellido}</p>
        <p className="card-text">C.C./PASAP: {empleado.cedula}</p>
        <p className="card-text">Sueldo: ${empleado.sueldo_ganado}</p>
        <p className="card-text">Aporte IESS 9.45%: ${iess.toFixed(2)}</p>
        <p className="card-text">Líquido a Recibir: ${liquidoRecibir.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default RolPago;