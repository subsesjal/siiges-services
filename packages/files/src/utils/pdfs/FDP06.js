/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  tipoSolicitudes, modalidades, niveles,
} = require('./constants');
const {
  tablaGrado,
} = require('./constants/fdp06-constants');
const {
  crearCelda, crearSeccion,
  seccionIntitucionTabla,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  updateCurrentPositionY,
  generateTableAndSection,
  agregarImagenYPaginaPie,
  buscarDescripcionPorId,
  buscarNombrePorId,
} = require('./pdfHandler06');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.setFillColor(6, 98, 211);
}
function redefineAddPage(doc) {
  const originalAddPage = doc.addPage;
  // eslint-disable-next-line no-param-reassign
  doc.addPage = function (...args) {
    originalAddPage.apply(this, args);
    addHeaderContent(this);
    return this;
  };
}

function GenerarFDP06(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  redefineAddPage(doc);
  addHeaderContent(doc);

  const fechaFormateada = formatearFecha(solicitud.createdAt);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const tipoSolicitud = buscarNombrePorId(tipoSolicitudes, solicitud.tipoSolicitudId);

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(0, 127, 204);
  crearCelda(doc, 150, 40, 45, 7, 'FDP06');

  configurarFuenteYAgregarTexto(doc, 'bold', 11, [69, 133, 244], 'PLANTILLA DOCENTE DE ASIGNATURA Ó TIEMPO COMPLETO', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, modalidadTipo, tipoSolicitud, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY = updateCurrentPositionY(doc, -20);
  currentPositionY = updateCurrentPositionY(doc, -20);

  currentPositionY = updateCurrentPositionY(doc);

  currentPositionY = tablaGrado(
    solicitud,
    doc,
    currentPositionY,
    generateTableAndSection,
  );

  currentPositionY = updateCurrentPositionY(doc, 5);
  currentPositionY = doc.previousAutoTable.finalY;
  currentPositionY += 10;

  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY;
  currentPositionY += 15;
  // eslint-disable-next-line no-unused-vars
  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`,
    'center',
  );

  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');

  return pdfDataUri;
}

module.exports = { GenerarFDP06 };
