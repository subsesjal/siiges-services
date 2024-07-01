/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  HEADER_PROGRAMA_SEGUIMIENTO,
  HEADER_TIPO_TUTORIA,
  HEADER_TASA_EGRESOS,
  // columnStyles,
  // HEADER_OPC_TUTORIAL,
  // HEADER_NOMBRE_DATOS,
  HEADER_FUNC_TUTO,
} = require('./constants/fdp05-constants');
const {
  crearCelda, crearSeccion,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  generateTableWithStyles,
  updateCurrentPositionY,
  // generateTableAndSection,
  agregarImagenYPaginaPie,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDP05(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  const fechaFormateada = formatearFecha(solicitud.createdAt);

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDP05');

  configurarFuenteYAgregarTexto(doc, 'bold', 11, [69, 133, 244], 'TRAYECTORIA EDUCATIVA Y TUTORÍA DE LOS ESTUDIANTES', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);

  // const seguimientoTrayec = solicitud.trayectoria.programaSeguimiento;

  const tablaSeguimiento = [
    ['', '']];
  generateTableWithStyles(HEADER_PROGRAMA_SEGUIMIENTO, tablaSeguimiento, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  // const nombresTuto = {
  //   headers: HEADER_NOMBRE_DATOS,
  //   body: HEADER_OPC_TUTORIAL,
  //   showHead: false,
  //   columnStyles,
  // };

  // currentPositionY += generateTbleASe('2. FUNCIÓN TUTURIAL', nombresTuto, doc, currentPositionY);
  // currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  // currentPositionY += 5;

  const tablaFuncTuto = [
    ['', '']];
  generateTableWithStyles(HEADER_FUNC_TUTO, tablaFuncTuto, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaEstudio = [
    ['', '']];
  generateTableWithStyles(HEADER_TIPO_TUTORIA, tablaEstudio, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaModelo = [
    ['', '']];
  generateTableWithStyles(HEADER_TASA_EGRESOS, tablaModelo, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 15);
  currentPositionY += 5;

  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 25;
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

module.exports = { GenerarFDP05 };
