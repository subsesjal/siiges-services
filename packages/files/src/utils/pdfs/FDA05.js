const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  tableModel,
  tableInfrastructure,
  tableHeadersUsuarios,
  tableHeadersVinculos,
  tableLinkType,
  tableWidthBand,
  tableHeaderAdministration,
  tableheaderCharacteristics,
  tableSoftwareCharacteristics,
  tableSupport,
  tableSecurity,
  tableAdvantages,
  tablePlan,
  tablePermissions,
} = require('./constants/fda05-constants');
const {
  crearCelda,
  crearSeccion,
  configurarFuenteYAgregarTexto,
  agregarImagenYPaginaPie,
  addNutmeg,
  switchTablas,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img4.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img6.png'), { encoding: 'base64' });

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 60, 9, 100, 23);
  doc.setFillColor(116, 200, 210);
  crearCelda(doc, 166, 40, 30, 7, 'FDA05', 10);
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

function GenerarFDA05(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  addNutmeg(doc);
  let currentPositionY = 67;
  redefineAddPage(doc);
  addHeaderContent(doc);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [116, 200, 210], 'PLATAFORMA EDUCATIVA TECNOLÓGICA', 20, 50);
  tableModel.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableInfrastructure.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableHeadersUsuarios.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableHeadersVinculos.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableLinkType.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableWidthBand.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  doc.addPage();
  addHeaderContent(doc);
  currentPositionY = 55;
  tableHeaderAdministration.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableheaderCharacteristics.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableSoftwareCharacteristics.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableSupport.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableSecurity.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableAdvantages.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tablePlan.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tablePermissions.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 5;
  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY += 5;
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

module.exports = { GenerarFDA05 };
