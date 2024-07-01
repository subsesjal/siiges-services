/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  modalidades, niveles, ciclos,
} = require('./constants');
const {
  HEADER_NOMBRE_DATOS,
  HEADER_INGRESO_EGRESO,
  columnStyles,
  HEADER_METODOS_INDUCCION,
  HEADER_SELECCION_ESTD,
  HEADER_MAPA_CURRICULAR,
  HEADER_FLEX_CURRICULAR,
  HEADER_OBJ_GEN_PLAN,
  HEADER_OBJ_PT_CMP_PLAN,
  HEADER_ESTRUCTURA_PLAN,
  HEADER_APARTADO,
  bodyApartado,
  HEADER_ACTUALIZACION_PLAN,
  HEADER_PROYECTO_SEG,
  HEADER_VINCULACION,
  HEADER_PRIM_SEM,
  HEADER_DOCENTE,
} = require('./constants/fdp02-constants');
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
  // generarTablaData,
} = require('./pdfHandler02');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDP02(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  const fechaFormateada = formatearFecha(solicitud.createdAt);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDP02');

  const nombreNivel = niveles
    .find(({ id }) => +id === solicitud?.programa.nivelId).descripcion;

  configurarFuenteYAgregarTexto(doc, 'bold', 11, [69, 133, 244], 'PLAN DE ESTUDIOS', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], solicitud.programa.plantel.institucion.nombre, 50, 60);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], `${nombreNivel} en ${solicitud.programa.nombre}`, 50, 70);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], 'COORDINADOR (A) DEL PLAN DE ESTUDIOS', 50, 80);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], 'PERFIL ACADÉMICO DEL (DE LA) COORDINADOR (A)', 50, 90);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [125, 125, 125], 'VIGENCIA', 50, 100);
  currentPositionY += 40;

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, modalidadTipo, ciclosTipo, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY = updateCurrentPositionY(doc, -20);
  currentPositionY = updateCurrentPositionY(doc, -20);

  // configurarFuenteYAgregarTexto(doc, 'bold', 10, [125, 125, 125],
  // 'SOLO APLICA PARA EL 1° Y 2° CICLO ESCOLAR (SEMESTRE O CUATRIMESTRE) POR CADA ASIGNATURA',
  // 10, 140);

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  const headerEstudio = ['1. ANTECEDENTES ACADÉMICOS DE INGRESO'];
  const tablaEstudio = [
    ['', '']];
  generateTableWithStyles(headerEstudio, tablaEstudio, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaInduccion = [
    ['', '']];
  generateTableWithStyles(HEADER_METODOS_INDUCCION, tablaInduccion, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const nombresPropuestos = {
    headers: HEADER_NOMBRE_DATOS,
    body: HEADER_INGRESO_EGRESO,
    showHead: false,
    columnStyles,
  };

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('3. PERFIL DE INGRESO', nombresPropuestos, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  const tablaModelo = [
    ['', '']];
  generateTableWithStyles(HEADER_SELECCION_ESTD, tablaModelo, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  currentPositionY = updateCurrentPositionY(doc, 60); // Espacio después de la celda

  currentPositionY += generateTableAndSection('5. PERFIL DE EGRESO', nombresPropuestos, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  const tablaMapa = [
    ['', '']];
  generateTableWithStyles(HEADER_MAPA_CURRICULAR, tablaMapa, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaFlex = [
    ['', '']];
  generateTableWithStyles(HEADER_FLEX_CURRICULAR, tablaFlex, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaObjGeneral = [
    ['', '']];
  generateTableWithStyles(HEADER_OBJ_GEN_PLAN, tablaObjGeneral, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaCompetencias = [
    ['', '']];
  generateTableWithStyles(HEADER_OBJ_PT_CMP_PLAN, tablaCompetencias, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaEstructuraPlan = [
    ['', '']];
  generateTableWithStyles(HEADER_ESTRUCTURA_PLAN, tablaEstructuraPlan, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  // Aqui va el cuadro de apartado ejemplo
  // const tablaApartado = {
  //   headers: HEADER_APARTADO,
  //   body: [bodyApartado],
  // };

  // currentPositionY += generateTableAndSection('', tablaApartado, doc, currentPositionY);
  // currentPositionY = updateCurrentPositionY(doc, 10);

  const apartadoBody = bodyApartado;
  generateTableWithStyles(HEADER_APARTADO, apartadoBody, doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  const tablaPrimSem = {
    headers: HEADER_DOCENTE,
    body: [
      ['Área 1', 'Asignatura 1', 'Clave 1', 'Seriación 1', 'Sí 1', 'No 1', 'Créditos 1', 'Instalaciones 1'],
      ['Área 2', 'Asignatura 2', 'Clave 2', 'Seriación 2', 'Sí 2', 'No 2', 'Créditos 2', 'Instalaciones 2'],
    ],
  };

  // const nombresPropuestos = {
  //   headers: HEADER_NOMBRE_DATOS,
  //   body: HEADER_INGRESO_EGRESO,
  //   showHead: false,
  //   columnStyles,
  // };

  currentPositionY += generateTableAndSection(HEADER_PRIM_SEM, tablaPrimSem, doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc);

  const tablaActualizacionPlan = [
    ['', '']];
  generateTableWithStyles(HEADER_ACTUALIZACION_PLAN, tablaActualizacionPlan, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaProyectoSeg = [
    ['', '']];
  generateTableWithStyles(HEADER_PROYECTO_SEG, tablaProyectoSeg, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const tablaVinculacion = [
    ['', '']];
  generateTableWithStyles(HEADER_VINCULACION, tablaVinculacion, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 15;

  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 20;
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

module.exports = { GenerarFDP02 };
