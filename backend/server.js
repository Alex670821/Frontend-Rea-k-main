const express = require('express');
const { Pool } = require('pg');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const cors = require('cors');
const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres', // Reemplaza con tu usuario de PostgreSQL
  host: 'localhost',
  database: 'empleados',
  password: 'GrupoAlvarez', // Reemplaza con tu contraseña de PostgreSQL
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Obtener todos los empleados
app.get('/empleados', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM empleados');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

// Crear un nuevo empleado
app.post('/empleados', async (req, res) => {
  const {
    nombre_apellido, cedula, linea, cargo, departamento, afiliado, ruc, fecha_entrada, fecha_salida,
    dias_trabajados, sueldo_iess, sueldo_ganado, horas_suplementarias, total_suplementarias,
    horas_extraordinarias, total_extraordinarias, comisiones, total_aportable, horas_extras,
    movilidad_ca, fondos_reserva_recibe, fondos_reserva_acumula, total_ingresos, iess,
    anticipos_febrero, descuentos, prestamos_iess, prestamos_empleados, multas, compras_consumos,
    pension_alimentos, total_egresos, a_pagar, banco, cuenta, mes, anio
  } = req.body;

  // Validar que el mes y el año sean correctos
  const mesesValidos = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  if (!mesesValidos.includes(mes)) {
    return res.status(400).json({ error: 'Mes no válido' });
  }
  if (anio < 2000 || anio > 2100) {
    return res.status(400).json({ error: 'Año no válido' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO empleados (
        nombre_apellido, cedula, linea, cargo, departamento, afiliado, ruc, fecha_entrada, fecha_salida,
        dias_trabajados, sueldo_iess, sueldo_ganado, horas_suplementarias, total_suplementarias,
        horas_extraordinarias, total_extraordinarias, comisiones, total_aportable, horas_extras,
        movilidad_ca, fondos_reserva_recibe, fondos_reserva_acumula, total_ingresos, iess,
        anticipos_febrero, descuentos, prestamos_iess, prestamos_empleados, multas, compras_consumos,
        pension_alimentos, total_egresos, a_pagar, banco, cuenta, mes, anio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37) RETURNING *`,
      [
        nombre_apellido, cedula, linea, cargo, departamento, afiliado, ruc, fecha_entrada, fecha_salida,
        dias_trabajados, sueldo_iess, sueldo_ganado, horas_suplementarias, total_suplementarias,
        horas_extraordinarias, total_extraordinarias, comisiones, total_aportable, horas_extras,
        movilidad_ca, fondos_reserva_recibe, fondos_reserva_acumula, total_ingresos, iess,
        anticipos_febrero, descuentos, prestamos_iess, prestamos_empleados, multas, compras_consumos,
        pension_alimentos, total_egresos, a_pagar, banco, cuenta, mes, anio
      ]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al registrar el empleado:', error);
    res.status(500).json({ error: 'Error al registrar el empleado' });
  }
});

// Generar PDF
app.get('/empleados/pdf/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);
    const empleado = rows[0];

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Título del PDF con el mes y año
    const titulo = `COMPROBANTE DE PAGO DEL MES DE ${empleado.mes.toUpperCase()} ${empleado.anio}`;
    page.drawText(titulo, {
      x: 50,
      y: height - 50,
      size: 20,
      font,
      color: rgb(0, 0, 0),
      
      
      
    });

    // Información del empleado
    page.drawText(`Empleado(a): ${empleado.nombre_apellido}`, {
      x: 50,
      y: height - 100,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    // Cálculos
    const totalAportable = empleado.total_aportable;
    const iess = totalAportable * 0.0945; // 9.45% de IESS
    const liquidoRecibir = totalAportable - iess - empleado.descuentos;

    // Ingresos y Egresos
    page.drawText(`Sueldo: $${empleado.sueldo_ganado}`, {
      x: 50,
      y: height - 160,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Aporte IESS 9.45%: $${iess.toFixed(2)}`, {
      x: 50,
      y: height - 180,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Líquido a Recibir: $${liquidoRecibir.toFixed(2)}`, {
      x: 50,
      y: height - 200,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});