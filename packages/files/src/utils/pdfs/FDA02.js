const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const { niveles, alumnos } = require('./constants');
const {
  TITLE_ALUMNO,
  HEADER_TABLA_ALUMNO,
  HEADER_NOMBRE_DATOS,
  rowsAlumno,
  HEADER_NOMBRE_PUESTO,
  diligenteBody,
  columnStyles,
} = require('./constants/historial-constants');
const {
  crearCelda, crearSeccion,
  seccionIntitucionTabla,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  updateCurrentPositionY,
  generateTableAndSection,
  generarTablaData,
  agregarImagenYPaginaPie,
} = require('./pdfHandlerHistorial');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDA02');
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

function GenerarFDA02(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  let currentPositionY = 67;

  const fechaFormateada = formatearFecha(solicitud.createdAt);

  redefineAddPage(doc);
  addHeaderContent(doc);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'OFICIO DE ENTREGA DE DOCUMENTACIÓN', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);

  const domicilioData = generarTablaData(
    HEADER_TABLA_ALUMNO,
    rowsAlumno(alumnos),
  );
  currentPositionY += generateTableAndSection(
    TITLE_ALUMNO,
    domicilioData,
    doc,
    currentPositionY,
  );

  currentPositionY = updateCurrentPositionY(doc);

  currentPositionY = doc.previousAutoTable.finalY;
  doc.addPage();
  currentPositionY = 55;
  const { diligencias } = solicitud;

  if (diligencias && diligencias.length) {
    diligencias.forEach((diligente, index) => {
      const tablaDataDiligencia = {
        headers: HEADER_NOMBRE_DATOS,
        body: diligenteBody(diligente),
        showHead: false,
        columnStyles,
      };
      generateTableAndSection(`Diligente ${index + 1}`, tablaDataDiligencia, doc, currentPositionY);
      currentPositionY += 50;
    });
  }
  currentPositionY = doc.previousAutoTable.finalY;
  currentPositionY = updateCurrentPositionY(doc, 10);
  const { ratificacionesNombre } = solicitud.programa.plantel.institucion;
  const nombresPropuestos = [];
  if (Array.isArray(ratificacionesNombre)) {
    ratificacionesNombre.forEach((ratificacion) => {
      nombresPropuestos.push(ratificacion.dataValues.nombrePropuesto1);
      nombresPropuestos.push(ratificacion.dataValues.nombrePropuesto2);
      nombresPropuestos.push(ratificacion.dataValues.nombrePropuesto3);
    });
  } else if (ratificacionesNombre) {
    nombresPropuestos.push(ratificacionesNombre.dataValues.nombrePropuesto1);
    nombresPropuestos.push(ratificacionesNombre.dataValues.nombrePropuesto2);
    nombresPropuestos.push(ratificacionesNombre.dataValues.nombrePropuesto3);
  }

  const nombresPropuestosTable = {
    headers: HEADER_NOMBRE_DATOS,
    body: HEADER_NOMBRE_PUESTO(nombresPropuestos),
    showHead: false,
    columnStyles,
  };

  currentPositionY += generateTableAndSection('NOMBRES PROPUESTOS PARA LA INSTITUCIÓN EDUCATIVA', nombresPropuestosTable, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;
  currentPositionY += 10;
  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY;
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

module.exports = { GenerarFDA02 };
