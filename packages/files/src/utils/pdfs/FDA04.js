const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  modalidades, ciclos,
} = require('./constants');
const {
  tablaDomicilio,
  tablaHigiene,
  tablaInfraestructuraPrograma,
  tablaRelacionInstituciones,
  tablaDatosPlan,
} = require('./constants/fda04-constants');

const {
  configurarFuenteYAgregarTexto,
  agregarImagenYPaginaPie,
  buscarDescripcionPorId,
  crearSeccion,
  addNutmeg,
  crearCelda,
  switchTablas,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img4.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img6.png'), { encoding: 'base64' });
let currentPositionY = 0;

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 60, 9, 100, 23);
  doc.setFillColor(116, 200, 210);
  crearCelda(doc, 166, 40, 30, 7, 'FDA04', 10);
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

function GenerarFDA04(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  addNutmeg(doc);
  redefineAddPage(doc);
  addHeaderContent(doc);

  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);
  const textoCiclos = ciclosTipo === 'Semestral' ? 'Semestres' : 'Cuatrimestres';

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [116, 200, 210], 'DESCRIPCIÓN DE LAS INSTALACIONES', 14, 45);

  currentPositionY = 60;
  tablaDatosPlan(solicitud, textoCiclos, modalidadTipo).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });

  currentPositionY += 5;
  tablaDomicilio(solicitud).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });

  currentPositionY += 5;
  tablaHigiene(solicitud).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });

  doc.addPage();
  addHeaderContent(doc);
  currentPositionY = 55;

  tablaInfraestructuraPrograma(solicitud).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });

  currentPositionY += 10;
  tablaRelacionInstituciones(solicitud).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });

  currentPositionY += 10;
  crearSeccion(currentPositionY, doc, 'BAJO PROTESTA DE DECIR VERDAD', 'center');
  currentPositionY += 5;
  crearSeccion(
    currentPositionY,
    doc,
    `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`,
    'center',
  );

  agregarImagenYPaginaPie(doc, img3);
  doc.internal.events.subscribe('addPage', () => {
    addHeaderContent(doc);
  });

  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarFDA04 };
