const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const {
  HEADER_NOMBRE_DATOS,
  columnStyles,
  HEADER_TITULOS_NOMBRES,
  columnStylesFirstAndSecondTable,
  TABLA_REPRESENTANTE,
  PROPUESTAS_NOMBRE,
  HEADER_DATOS_AUTORIZACION,
} = require('./constants/fda03-constants');
const {
  crearCelda, crearSeccion,
  agregarImagenYPaginaPie,
  updateCurrentPositionY,
  configurarFuenteYAgregarTexto,
  formatearFecha,
  crearFilaFecha,
  generateTableAndSection,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDA03(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 20;
  const fechaFormateada = formatearFecha(solicitud.createdAt);
  // Add header images
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 165, 40, 30, 7, 'FDA03');

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'SOLICITUD PARA LA AUTORIZACIÓN DE NOMBRE DE LA INSTITUCIÓN', 20, 55);
  currentPositionY += 40;

  currentPositionY = crearFilaFecha({
    currentPositionY,
    fecha: fechaFormateada,
    doc,
  });

  const TablaRepresentante = {
    headers: HEADER_NOMBRE_DATOS,
    body: [],
    showHead: false,
    columnStyles: columnStylesFirstAndSecondTable,
  };

  if (solicitud?.programa?.plantel?.institucion?.rector?.persona) {
    TablaRepresentante.body = TABLA_REPRESENTANTE(solicitud.programa.plantel.institucion.rector.persona);
  }

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('1. DATOS DEL PROPIETARIO O REPRESENTANTE LEGAL', TablaRepresentante, doc, currentPositionY);

  const TablaPropuestaNombres = {
    headers: HEADER_NOMBRE_DATOS,
    body: PROPUESTAS_NOMBRE(solicitud.programa.plantel.institucion.ratificacionesNombre[0]),
    showHead: false,
    columnStyles: columnStylesFirstAndSecondTable,
  };
  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('3. PROPUESTAS DE NOMBRE', TablaPropuestaNombres, doc, currentPositionY);

  const nombresPropuestos = {
    headers: HEADER_TITULOS_NOMBRES,
    body: HEADER_DATOS_AUTORIZACION(solicitud.programa.plantel.institucion.ratificacionesNombre[0]),
    showHead: false,
    columnStyles,
  };

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('4. EN CASO DE TENER NOMBRE AUTORIZADO', nombresPropuestos, doc, currentPositionY);

  let content = 'BAJO PROTESTA DE DECIR VERDAD';
  currentPositionY = updateCurrentPositionY(doc);
  currentPositionY += 10;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'center');
  content = `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`;
  currentPositionY += 5;
  crearSeccion(currentPositionY, doc, content, 'center');

  // Add footer image and page number
  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarFDA03 };
