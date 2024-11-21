const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  niveles,
} = require('./constants');
const {
  tableInstitution,
  tableStudy,
  tableSupplyDemandStudy,
  tableSourcesInformation,
  tableModelEducation,
  tablePolitics,
  tableIdeasInstitutional,
} = require('./constants/fdp01-constants');
const {
  crearCelda, crearSeccion,
  switchTablas,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  agregarImagenYPaginaPie,
  tableDate,
  addNutmeg,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });
function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 166, 40, 30, 7, 'FDA04', 10);
}
function GenerarFDP01(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  addNutmeg(doc);
  let currentPositionY = 50;

  const dateFormatted = formatearFecha(solicitud.createdAt);
  const nombreNivel = niveles
    .find(({ id }) => +id === solicitud?.programa.nivelId).descripcion;
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 166, 40, 30, 7, 'FDP01', 10);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'PLAN DE ESTUDIOS', 14, 50);
  tableDate(doc, currentPositionY, dateFormatted);
  currentPositionY += 15;

  tableInstitution(solicitud, nombreNivel).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableStudy().forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableSupplyDemandStudy.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableSourcesInformation.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tableModelEducation.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  tablePolitics.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  doc.addPage();
  addHeaderContent(doc);
  currentPositionY = 57;
  tableIdeasInstitutional.forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY += 5;
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

module.exports = { GenerarFDP01 };
