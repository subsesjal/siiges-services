const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  tiposSolicitud, modalidades, niveles,
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
  addNutmeg,
} = require('./pdfHandler06');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img4.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img6.png'), { encoding: 'base64' });

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 60, 9, 100, 23);
  doc.setFillColor(116, 200, 210);
}
function redefineAddPage(document) {
  const originalAddPage = document.addPage.bind(document);
  const newDocument = { ...document };
  newDocument.addPage = function addPageWithHeader(...args) {
    originalAddPage(...args);
    addHeaderContent(this);
    return this;
  };
  return newDocument;
}

function GenerarFDP06(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  addNutmeg(doc);
  let currentPositionY = 67;

  redefineAddPage(doc);
  addHeaderContent(doc);

  const fechaFormateada = formatearFecha(solicitud.createdAt);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const tipoSolicitud = buscarNombrePorId(tiposSolicitud, solicitud.tipoSolicitudId);

  doc.setFillColor(116, 200, 210);
  crearCelda(doc, 150, 40, 45, 7, 'FDP06');

  configurarFuenteYAgregarTexto(doc, 'bold', 11, [116, 200, 210], 'PLANTILLA DOCENTE DE ASIGNATURA Ó TIEMPO COMPLETO', 20, 50);
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
  crearSeccion(
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
