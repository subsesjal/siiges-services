const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

const NutmegFont = fs.readFileSync(path.resolve(__dirname, '../../../../../fonts/nutmeg-regular.ttf')).toString('base64');
const NutmegFontBold = fs.readFileSync(path.resolve(__dirname, '../../../../../fonts/nutmeg-bold.ttf')).toString('base64');

require('jspdf-autotable');

const {
  situaciones, niveles,
} = require('./constants');

const {
  buscarDescripcionPorId,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  updateCurrentPositionY,
  generateTableAndSection,
  agregarImagenYPaginaPie,
} = require('./pdfHandlerHistorial');

const {
  studentDataTable, scholarCicleTable, promedioTable, institutionTable,
} = require('./constants/historial-constants');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });
let currentPositionY = 67;

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
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

function crearCelda(doc, x, y, width, height, text, bold = false, fontSize = 10, alignment = 'center') {
  doc.rect(x, y, width, height, 'F');
  doc.rect(x, y, width, height, 'S');
  doc.setFontSize(fontSize);
  let textoX = x;
  if (alignment === 'center') {
    textoX = x + (width - (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor) / 2;
  }

  doc.setTextColor(0, 0, 0);
  if (bold) {
    doc.setFont('Nutmeg', 'bold');
    doc.text(text, textoX + 0.15, y + 5);
  } else {
    doc.setFont('Nutmeg', 'normal');
    doc.text(text, textoX, y + 5);
  }
}

function crearTablaEspecifica(doc, item) {
  let x = 14;
  const altura = item.altura || 7;
  item.contenido.forEach((cell) => {
    const ancho = cell.medida || 111;
    const colorFondo = cell.color === 'blanco'
      ? [255, 255, 255]
      : [172, 178, 183];

    doc.setFillColor(...colorFondo);
    crearCelda(
      doc,
      x,
      currentPositionY,
      ancho,
      altura,
      cell.texto,
      cell.bold,
      cell.tamano,
      cell.acomodoLetra,
    );
    x += ancho;
  });

  currentPositionY += altura;
}

function switchTablas(item, doc, titulo) {
  let i = 0;
  switch (item.tipo) {
    case 'titulo':
      currentPositionY = generateTableAndSection(
        item.contenido,
        titulo,
        doc,
        currentPositionY,
      );
      currentPositionY = updateCurrentPositionY(doc, 0);
      break;
    case 'fila':
      do {
        crearTablaEspecifica(doc, item);
        i += 1;
      } while (i < item.repetirVeces);
      break;
    default:
      break;
  }
}

function GenerarSolicitudEquivalencia() {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  doc.addFileToVFS('nutmeg-bold.ttf', NutmegFontBold);
  doc.addFont('nutmeg-bold.ttf', 'Nutmeg', 'bold');
  doc.addFileToVFS('nutmeg-regular.ttf', NutmegFont);
  doc.addFont('nutmeg-regular.ttf', 'Nutmeg', 'normal');
  doc.setFont('Nutmeg', 'normal');
  redefineAddPage(doc);
  addHeaderContent(doc);

  doc.setFontSize(8);
  currentPositionY = 47;
  const text = `
SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA
SUBSECRETARÍA DE EDUCACIÓN SUPERIOR
DIRECCIÓN GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES
`;

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 15;
  const contentWidth = pageWidth - marginX * 2;

  doc.text(text.trim(), 200, currentPositionY, {
    maxWidth: contentWidth,
    align: 'right',
  });
  currentPositionY += 20;

  const titleText = 'SOLICITUD PARA EL TRÁMITE DE EQUIVALENCIA DE ESTUDIOS DE EDUCACIÓN SUPERIOR';
  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(10);
  const textWidth = doc.getTextWidth(titleText);
  const positionX = (pageWidth - textWidth) / 2;
  doc.text(titleText, positionX, currentPositionY);

  doc.setFont('Nutmeg', 'normal');
  currentPositionY += 10;

  let Text = 'NÚMERO DE EXPEDIENTE*';
  doc.setFontSize(8);
  doc.text(Text, 100, currentPositionY);

  currentPositionY += 10;

  Text = 'NÚMERO DE FOLIO*';
  doc.text(Text, 100, currentPositionY);

  currentPositionY += 10;

  Text = 'FECHA DE SOLICITUD*';
  doc.text(Text, 30, currentPositionY);
  Text = 'GRADO ACADÉMICO';
  doc.text(Text, 90, currentPositionY);
  Text = 'TIPO DE SOLICITUD';
  doc.text(Text, 150, currentPositionY);

  currentPositionY += 20;
  Text = 'N° DE ASIGNATURAS A EQUIVALER';
  doc.text(Text, 70, currentPositionY);
  Text = 'FOLIO DE RESOLUCIÓN (solo para duplicados)';
  doc.text(Text, 130, currentPositionY);

  currentPositionY += 10;
  Text = 'DATOS DEL SOLICITANTE';
  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(10);
  doc.text(Text, 70, currentPositionY);

  Text = 'NOMBRE';
  doc.text(Text, 130, currentPositionY);
  Text = 'NOMBRE';
  doc.text(Text, 130, currentPositionY);
  Text = 'NOMBRE';
  doc.text(Text, 130, currentPositionY);
  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(8);

  currentPositionY += 20;
  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarSolicitudEquivalencia };
