const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const imgHeader = fs.readFileSync(path.join(__dirname, '/images/img4.png'), { encoding: 'base64' });

function GenerarFDA01(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF({ orientation: 'landscape' });
  let currentPositionY = 20;

  // Agregar Encabezado de Imagen
  doc.addImage(imgHeader, 'JPEG', 60, 9, 100, 23);
  currentPositionY += 30;

  // Encabezado de Texto
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA', 148, currentPositionY, { align: 'center' });
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('SUBSECRETARÍA DE EDUCACIÓN SUPERIOR', 148, currentPositionY + 5, { align: 'center' });
  doc.text('COORDINACIÓN DE BECAS ACADÉMICAS Y SERVICIO SOCIAL', 148, currentPositionY + 10, { align: 'center' });
  doc.text('REPORTE DE BECAS ACADÉMICAS DE EDUCACIÓN SUPERIOR', 148, currentPositionY + 15, { align: 'center' });
  currentPositionY += 25;

  const representante = solicitud.usuario?.persona || {};

  // Primera Tabla en formato horizontal
  const tableData = [[
    solicitud.programa?.plantel?.institucion?.nombre || 'No se encuentra',
    solicitud.programa?.plantel?.nombre || 'No se encuentra',
    solicitud?.programa?.acuerdoRvoe || 'No se encuentra',
    solicitud.programa?.plantel?.domicilio?.calle || 'No se encuentra',
    solicitud.createdAt ? new Date(solicitud.createdAt).toLocaleDateString('es-MX') : 'No se encuentra',
    `${representante.nombre || ''} ${representante.apellidoPaterno || ''} ${representante.apellidoMaterno || ''}`.trim() || 'No se encuentra',
    solicitud?.usuario?.persona?.correoPrimario || 'No se encuentra',
  ]];

  doc.autoTable({
    startY: currentPositionY,
    head: [['Nombre de la Institución', 'Plantel', 'RVOE', 'Domicilio', 'Fecha de Reporte', 'Representante Legal', 'Correo Electrónico']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [172, 178, 183], textColor: [0, 0, 0] },
  });
  currentPositionY = doc.previousAutoTable.finalY + 10;

  // Segunda Tabla (Lista de Becados - Extraídos de la solicitud)
  const becadosData = solicitud.becarios?.map((becario) => [
    becario.nombre || 'No se encuentra',
    becario.grado || 'No se encuentra',
    becario.nivel || 'No se encuentra',
    becario.promedio || 'No se encuentra',
    becario.estado || 'No se encuentra',
    becario.porcentajeBeca || 'No se encuentra',
    becario.tipoSolicitud || 'No se encuentra',
    becario.correo || 'No se encuentra',
    becario.curp || 'No se encuentra',
    becario.domicilio || 'No se encuentra',
    becario.municipio || 'No se encuentra',
  ]) || [['No hay becados disponibles']];

  doc.autoTable({
    startY: currentPositionY,
    head: [['Nombre', 'Grado E', 'Grado A', 'Promedio', 'Estado', '% Beca', 'Tipo Solicitud', 'Correo Electrónico', 'CURP', 'Domicilio', 'Municipio']],
    body: becadosData,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [172, 178, 183], textColor: [0, 0, 0] },
  });

  return doc.output('arraybuffer');
}

module.exports = { GenerarFDA01 };
