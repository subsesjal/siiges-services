const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const {
  tableRepresentativeLegal,
  tableProposedNames,
  tableAuthorizedData,
} = require('./constants/fda03-constants');
const {
  crearCelda, crearSeccion,
  agregarImagenYPaginaPie,
  configurarFuenteYAgregarTexto,
  formatearFecha,
  switchTablas,
  addNutmeg,
  tableDate,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDA03(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  addNutmeg(doc);
  let currentPositionY = 20;
  const dateFormatted = formatearFecha(solicitud.createdAt);
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 166, 40, 30, 7, 'FDA03', 10);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'SOLICITUD PARA LA AUTORIZACIÓN DE NOMBRE DE LA INSTITUCIÓN', 14, 55);
  currentPositionY += 40;

  tableDate(doc, currentPositionY, dateFormatted);
  currentPositionY += 20;

  const rectorPerson = solicitud?.programa?.plantel?.institucion?.rector?.persona;
  tableRepresentativeLegal(rectorPerson).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;

  const proposedNames = solicitud?.programa?.plantel?.institucion?.ratificacionesNombre[0];
  tableProposedNames(proposedNames).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;

  tableAuthorizedData(proposedNames).forEach((item) => {
    currentPositionY += switchTablas(item, doc, '', currentPositionY);
  });
  currentPositionY += 10;
  let content = 'BAJO PROTESTA DE DECIR VERDAD';
  currentPositionY += 30;
  currentPositionY += 10;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'center');
  content = `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`;
  currentPositionY += 5;
  crearSeccion(currentPositionY, doc, content, 'center');

  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarFDA03 };
