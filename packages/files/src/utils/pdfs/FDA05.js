/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  HEADER_NOMBRE_DATOS,
  columnStyles,
  HEADER_ROLES,
  HEADER_ENLACE,
} = require('./constants/fda05-constants');
const {
  crearCelda, crearSeccion,
  configurarFuenteYAgregarTexto,
  generateTableWithStyles,
  updateCurrentPositionY,
  generateTableAndSection,
  agregarImagenYPaginaPie,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDA05');
}
function redefineAddPage(doc) {
  const originalAddPage = doc.addPage;

  // eslint-disable-next-line no-param-reassign, func-names
  doc.addPage = function (...args) {
    originalAddPage.apply(this, args);
    addHeaderContent(this);
    return this;
  };
}

function GenerarFDA05(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;
  redefineAddPage(doc);
  addHeaderContent(doc);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'PLATAFORMA EDUCATIVA TECNOLÓGICA', 20, 50);
  const headerModelo = ['1. DESCRIPCIÓN DEL MODELO TEÓRICO-PEDAGÓGICO'];
  const tablaModelo = [
    ['', '']];
  generateTableWithStyles(headerModelo, tablaModelo, doc, currentPositionY, 'center');
  currentPositionY = updateCurrentPositionY(doc, 5);

  const headerInfraestructura = ['2. DESCRIPCIÓN DE LA INFRAESTRUCTURA TECNOLÓGICA DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA.'];
  const tablaInfraestructura = [
    ['', '']];
  generateTableWithStyles(headerInfraestructura, tablaInfraestructura, doc, currentPositionY, 'center');

  const headersUsuarios = {
    headers: HEADER_NOMBRE_DATOS,
    body: HEADER_ROLES,
    showHead: false,
    columnStyles,
  };

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('3. ROLES DE USUARIOS DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA', headersUsuarios, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  const headersVinculos = {
    headers: HEADER_NOMBRE_DATOS,
    body: HEADER_ENLACE,
    showHead: false,
    columnStyles,
  };
  currentPositionY += generateTableAndSection('4. ENLACE O VÍNCULO DE ACCESO PARA LA PLATAFORMA TECNOLÓGICA EDUCATIVA', headersVinculos, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 5;

  currentPositionY = updateCurrentPositionY(doc, 10);
  currentPositionY = updateCurrentPositionY(doc);

  // New table section
  const newTableData = {
    headers: ['', '', '', '', ''],
    body: [
      ['', 'ENLACE DEDICADO', 'ADSL', 'FIBRA ÓPTICA', 'OTRO (ESPECIFIQUE)'], ['TIPO DE ENLACE DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA\nLA PLATAFORMA\nTECNOLÓGICA\nEDUCATIVA', '', '', '', ''],
    ],
    showHead: false,
  };

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY += generateTableAndSection('5. TIPO DE ENLACE DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA.', newTableData, doc, currentPositionY);

  currentPositionY = updateCurrentPositionY(doc);
  const headerAnchoDeBanda = ['6. ANCHO DE BANDA DISPONIBLE PARA EL USO DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA.'];
  const tablaAnchoDeBanda = [
    ['', '']];
  generateTableWithStyles(headerAnchoDeBanda, tablaAnchoDeBanda, doc, currentPositionY, 'center');

  doc.addPage();
  currentPositionY = 55;
  const headerAdministracion = ['7. ADMINISTRACIÓN Y PLANES DE CRECIMIENTO.'];
  const tablaAdministracion = [
    ['', '']];
  generateTableWithStyles(headerAdministracion, tablaAdministracion, doc, currentPositionY, 'center');

  currentPositionY = updateCurrentPositionY(doc);
  const headerCaracteristicas = ['8. CARACTERÍSTICAS DEL HARDWARE, LAS DEL CÓMPUTO CENTRAL Y DISTRIBUIDO, ASÍ COMO LA BASE DE DATOS.'];
  const tablaCaracteristicas = [
    ['', '']];
  generateTableWithStyles(headerCaracteristicas, tablaCaracteristicas, doc, currentPositionY, 'center');

  currentPositionY = updateCurrentPositionY(doc);
  const headerCaracteristicasSoftware = ['9. CARACTERÍSTICAS DEL SOFTWARE, LAS DEL CÓMPUTO CENTRAL Y DISTRIBUIDO, ASÍ COMO LA BASE DE DATOS.'];
  const tablaCaracteristicasSoftware = [
    ['', '']];
  generateTableWithStyles(headerCaracteristicasSoftware, tablaCaracteristicasSoftware, doc, currentPositionY, 'center');

  const newTableData2 = {
    headers: ['', '', ''],
    body: [
      ['RESOLUCIÓN DE PROBLEMAS BÁSICOS', 'RESOLUCIÓN DE PROBLEMAS POR PERSONAL ESPECIALIZADO', 'RESOLUCIÓN DE PROBLEMAS A NIVEL DE EXPERTO'], ['', '', ''],
    ],
    showHead: false,
  };

  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY += generateTableAndSection('10. SOPORTE TÉCNICO.', newTableData2, doc, currentPositionY);

  currentPositionY = updateCurrentPositionY(doc);
  const headerSeguridad = ['11. SEGURIDAD DE LA INFORMACIÓN.'];
  const tablaSeguridad = [
    ['', '']];
  generateTableWithStyles(headerSeguridad, tablaSeguridad, doc, currentPositionY, 'center');

  currentPositionY = updateCurrentPositionY(doc);
  const headerVentajas = ['12. VENTAJAS.'];
  const tablaVentajas = [
    ['', '']];
  generateTableWithStyles(headerVentajas, tablaVentajas, doc, currentPositionY, 'center');

  currentPositionY = updateCurrentPositionY(doc);
  const headerPlan = ['13. PLAN DE CONTINGENCIAS.'];
  const tablaPlan = [
    ['', '']];
  generateTableWithStyles(headerPlan, tablaPlan, doc, currentPositionY, 'center');

  currentPositionY = updateCurrentPositionY(doc);
  const headerPermisos = ['14. PERMISOS, LICENCIAS E INSTRUMENTOS. '];
  const tablaPermisos = [
    ['', '']];
  generateTableWithStyles(headerPermisos, tablaPermisos, doc, currentPositionY, 'center');

  currentPositionY += 30;
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

module.exports = { GenerarFDA05 };
