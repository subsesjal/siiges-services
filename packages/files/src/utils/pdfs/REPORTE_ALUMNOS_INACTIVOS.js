const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const imgHeader = fs.readFileSync(path.join(__dirname, '/images/img4.png'), { encoding: 'base64' });

function formatearFecha(fecha) {
  if (!fecha) return 'No disponible';
  return new Date(fecha).toLocaleDateString('es-MX');
}

function GenerarReporteAlumnosInactivos(alumnos) {
  const JsPDF = jsPDF;
  const doc = new JsPDF({ orientation: 'landscape' });
  let currentPositionY = 20;

  doc.addImage(imgHeader, 'JPEG', 60, 9, 100, 23);
  currentPositionY += 30;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA', 148, currentPositionY, { align: 'center' });
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('SUBSECRETARÍA DE EDUCACIÓN SUPERIOR', 148, currentPositionY + 5, { align: 'center' });
  doc.text('REPORTE DE ALUMNOS INACTIVOS', 148, currentPositionY + 10, { align: 'center' });
  currentPositionY += 20;

  const institucion = alumnos?.[0]?.programa?.plantel?.institucion?.nombre || 'No disponible';
  const fechaReporte = new Date().toLocaleDateString('es-MX');

  doc.autoTable({
    startY: currentPositionY,
    head: [['Institución', 'Fecha de Reporte', 'Total de Alumnos']],
    body: [[institucion, fechaReporte, alumnos?.length || 0]],
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [172, 178, 183], textColor: [0, 0, 0] },
  });
  currentPositionY = doc.previousAutoTable.finalY + 10;

  const alumnosData = alumnos?.map((alumno) => [
    `${alumno?.persona?.nombre || ''} ${alumno?.persona?.apellidoPaterno || ''} ${alumno?.persona?.apellidoMaterno || ''}`.trim() || 'No disponible',
    alumno?.persona?.curp || 'No disponible',
    formatearFecha(alumno?.validacion?.fechaInicioAntecedente),
    formatearFecha(alumno?.validacion?.fechaFinAntecedente),
    formatearFecha(alumno?.validacion?.createdAt),
    formatearFecha(alumno?.validacion?.fechaExpedicion),
    alumno?.validacion?.tipo?.descripcion || 'No disponible',
  ]) || [['No hay alumnos inactivos disponibles']];

  doc.autoTable({
    startY: currentPositionY,
    head: [[
      'Nombre',
      'CURP',
      'Fecha de Inicio de Antecedentes',
      'Fecha de Fin de Antecedentes',
      'Fecha de Creación',
      'Fecha de Expedición',
      'Tipo de Validación',
    ]],
    body: alumnosData,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [172, 178, 183], textColor: [0, 0, 0] },
  });

  return doc.output('arraybuffer');
}

module.exports = { GenerarReporteAlumnosInactivos };
