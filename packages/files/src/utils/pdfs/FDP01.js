/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  niveles,
} = require('./constants');
const {
  HEADER_NOMBRE_DATOS,
  HEADER_NOMBRE_PUESTO,
  columnStyles,
  HEADER_IDEARIO,
} = require('./constants/fdp01-constants');
const {
  crearCelda, crearSeccion,
  seccionIntitucionTabla,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  generateTableWithStyles,
  updateCurrentPositionY,
  generateTableAndSection,
  agregarImagenYPaginaPie,
  crearFilaFecha,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDP01(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  const fechaFormateada = formatearFecha(solicitud.createdAt);

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDP01');

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'DEL PLAN DE ESTUDIOS', 20, 50);
  currentPositionY = crearFilaFecha({
    currentPositionY,
    fecha: fechaFormateada,
    doc,
  });

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY = updateCurrentPositionY(doc, -20);
  currentPositionY = updateCurrentPositionY(doc, -20);
  const nombresPropuestos = {
    headers: HEADER_NOMBRE_DATOS,
    body: HEADER_NOMBRE_PUESTO,
    showHead: false,
    columnStyles,
  };

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('1. ESTUDIO DE PERTINENCIA Y FACTIBILIDAD', nombresPropuestos, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  const headerEstudio = ['2. ESTUDIO DE OFERTA Y DEMANDA'];
  const tablaEstudio = [
    ['', '']];
  generateTableWithStyles(headerEstudio, tablaEstudio, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const headerFuentes = ['3. FUENTES DE INFORMACIÓN'];
  const tablaFuentes = [
    ['', '']];
  generateTableWithStyles(headerFuentes, tablaFuentes, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const headerModelo = ['4. MODELO EDUCATIVO'];
  const tablaModelo = [
    ['', '']];
  generateTableWithStyles(headerModelo, tablaModelo, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const headerPoliticas = ['5. POLÍTICAS DE FUNCIONAMIENTO'];
  const tablaPoliticas = [
    ['', '']];
  generateTableWithStyles(headerPoliticas, tablaPoliticas, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const nombresIdeario = {
    headers: HEADER_NOMBRE_DATOS,
    body: HEADER_IDEARIO,
    showHead: false,
    columnStyles,
  };

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('6. IDEARIO INSTITUCIONAL', nombresIdeario, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 10;
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

module.exports = { GenerarFDP01 };
