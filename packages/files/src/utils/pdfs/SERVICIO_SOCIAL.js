const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const imgHeader = fs.readFileSync(path.join(__dirname, '/images/img4.png'), { encoding: 'base64' });

function GenerarServicio(solicitud, alumnos) {
  const JsPDF = jsPDF;
  const doc = new JsPDF({ orientation: 'landscape' });
  let currentPositionY = 20;

  // Encabezado de imagen
  doc.addImage(imgHeader, 'JPEG', 60, 9, 100, 23);
  currentPositionY += 30;

  // Encabezado de texto
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA', 148, currentPositionY, { align: 'center' });
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('SUBSECRETARÍA DE EDUCACIÓN SUPERIOR', 148, currentPositionY + 5, { align: 'center' });
  doc.text('COORDINACIÓN DE BECAS ACADÉMICAS Y SERVICIO SOCIAL', 148, currentPositionY + 10, { align: 'center' });
  doc.text('REPORTE DE SERVICIO SOCIAL DE EDUCACIÓN SUPERIOR', 148, currentPositionY + 15, { align: 'center' });
  currentPositionY += 25;

  const representante = solicitud.usuario?.persona || {};

  // Primera tabla (Datos del programa)
  const tableData = [[
    solicitud.programa?.plantel?.institucion?.nombre || 'No se encuentra',
    solicitud?.programa?.acuerdoRvoe || 'No se encuentra',
    solicitud.programa?.plantel?.domicilio?.calle || 'No se encuentra',
    solicitud.createdAt ? new Date(solicitud.createdAt).toLocaleDateString('es-MX') : 'No se encuentra',
    `${representante.nombre || ''} ${representante.apellidoPaterno || ''} ${representante.apellidoMaterno || ''}`.trim() || 'No se encuentra',
    solicitud?.usuario?.correo || 'No se encuentra',
  ]];

  doc.autoTable({
    startY: currentPositionY,
    head: [['Nombre de la Institución', 'RVOE', 'Domicilio', 'Fecha de Reporte', 'Representante Legal', 'Correo Electrónico']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [172, 178, 183], textColor: [0, 0, 0] },
  });
  currentPositionY = doc.previousAutoTable.finalY + 10;

  // Segunda tabla (Alumnos de servicio social sin columna No y Plan de Estudios)
  const alumnosData = alumnos?.map((alumno) => [
    `${alumno?.alumno?.persona?.nombre || ''} ${alumno?.alumno?.persona?.apellidoPaterno || ''} ${alumno?.alumno?.persona?.apellidoMaterno || ''}`.trim(),
    alumno?.grado?.nombre || 'No se encuentra',
    alumno?.estatusAlumnoBeca?.nombre || 'No se encuentra',
    alumno?.porcentajeBeca || 'No se encuentra',
    alumno?.alumno?.persona?.correoPrimario || 'No se encuentra',
    alumno?.alumno?.persona?.curp || 'No se encuentra',
    alumno?.alumno?.persona?.direccion || 'No se encuentra',
    alumno?.alumno?.persona?.municipio || 'No se encuentra',
  ]) || [['No hay alumnos disponibles']];

  doc.autoTable({
    startY: currentPositionY,
    head: [
      [
        'Nombre',
        'Grado',
        'Estatus',
        '% Beca',
        'Correo Electrónico',
        'CURP',
        'Domicilio',
        'Municipio',
      ],
    ],
    body: alumnosData,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [172, 178, 183], textColor: [0, 0, 0] },
  });

  return doc.output('arraybuffer');
}

module.exports = { GenerarServicio };
