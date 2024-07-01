/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  tipoSolicitudes, modalidades, niveles,
} = require('./constants');
const {
  HEADER_SEMESTRE,
  TITLE_PRIMER_SC,
} = require('./constants/fdp06-constants');
const {
  crearCelda, crearSeccion,
  seccionIntitucionTabla,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  generateTableWithStyles,
  updateCurrentPositionY,
  generateTableAndSection,
  agregarImagenYPaginaPie,
  buscarDescripcionPorId,
  buscarNombrePorId,
} = require('./pdfHandler06');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDP06(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  const fechaFormateada = formatearFecha(solicitud.createdAt);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const tipoSolicitud = buscarNombrePorId(tipoSolicitudes, solicitud.tipoSolicitudId);

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDP06');

  configurarFuenteYAgregarTexto(doc, 'bold', 11, [69, 133, 244], 'PLANTILLA DOCENTE DE ASIGNATURA Ó TIEMPO COMPLETO', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, modalidadTipo, tipoSolicitud, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY = updateCurrentPositionY(doc, -20);
  currentPositionY = updateCurrentPositionY(doc, -20);

  // configurarFuenteYAgregarTexto(doc, 'bold', 10, [125, 125, 125],
  // 'SOLO APLICA PARA EL 1° Y 2° CICLO ESCOLAR (SEMESTRE O CUATRIMESTRE)
  // POR CADA ASIGNATURA', 10, 140);

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  // const rectorPersona = solicitud.programa.plantel.institucion?.rector?.persona;
  const tablaPrimSem = {
    headers: HEADER_SEMESTRE,
    body: [
      ['1', 'Docente', 'Form', 'Docu', 'a', 'a', 'a', 'X', '', 'Blah Blah'],
      ['2', 'Docente', 'Form', 'Docu', 'a', 'a', 'a', '', 'X', 'Blah Blah'],
    ],
  };

  currentPositionY += generateTableAndSection(TITLE_PRIMER_SC, tablaPrimSem, doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc);

  // Arreglar
  // const primerCicloEsc = generarTablaData(
  //   HEADER_SEMESTRE,
  //   rowsDocente(solicitud.programa.docente),
  // );

  // currentPositionY += generateTableAndSection(
  //   TITLE_PRIMER_SC,
  //   primerCicloEsc,
  //   doc,
  //   currentPositionY,
  // );

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

  // Aqui
  // const nombres

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  // o AQUI

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

module.exports = { GenerarFDP06 };
