const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  HEADER_PROGRAMA_SEGUIMIENTO,
  HEADER_TIPO_TUTORIA,
  HEADER_TASA_EGRESOS,
  HEADER_FUNC_TUTO,
} = require('./constants/fdp05-constants');
const {
  crearCelda, crearSeccion,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  generateTableWithStyles,
  updateCurrentPositionY,
  agregarImagenYPaginaPie,
  addNutmeg,
} = require('./pdfHandler');

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

function GenerarFDP05(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  let currentPositionY = 67;
  addNutmeg(doc);
  redefineAddPage(doc);
  addHeaderContent(doc);

  const fechaFormateada = formatearFecha(solicitud.createdAt);

  doc.setFillColor(116, 200, 210);
  crearCelda(doc, 166, 40, 30, 7, 'FDP05', 10);

  configurarFuenteYAgregarTexto(doc, 'bold', 11, [116, 200, 210], 'TRAYECTORIA EDUCATIVA Y TUTORÍA DE LOS ESTUDIANTES', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);

  const tablaSeguimiento = [[solicitud?.programa?.trayectoria?.programaSeguimiento]];
  generateTableWithStyles(HEADER_PROGRAMA_SEGUIMIENTO, tablaSeguimiento, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaFuncTuto = [[solicitud?.programa?.trayectoria?.funcionTutorial]];
  generateTableWithStyles(HEADER_FUNC_TUTO, tablaFuncTuto, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaEstudio = [[solicitud?.programa?.trayectoria?.tipoTutoria]];
  generateTableWithStyles(HEADER_TIPO_TUTORIA, tablaEstudio, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaModelo = [[solicitud?.programa?.trayectoria?.tasaEgreso]];
  generateTableWithStyles(HEADER_TASA_EGRESOS, tablaModelo, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 15);
  currentPositionY += 5;

  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY;
  currentPositionY += 25;
  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    `${solicitud?.usuario?.persona?.nombre} ${solicitud?.usuario?.persona?.apellidoPaterno} ${solicitud?.usuario?.persona?.apellidoMaterno}`,
    'center',
  );

  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');

  return pdfDataUri;
}

module.exports = { GenerarFDP05 };
