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

function crearCelda(doc, x, y, width, height, text, bold = false, fontSize = 9, alignment = 'center') {
  doc.rect(x, y, width, height, 'F');
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

function crearTablaEspecifica(doc, item, x = 14) {
  const altura = item.altura || 7;
  item.contenido.forEach((cell) => {
    const ancho = cell.medida || 111;
    const colorFondo = [211, 225, 249];

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

function switchTablas(item, doc, titulo, x) {
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
        crearTablaEspecifica(doc, item, x);
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
  doc.setFontSize(9);
  const field = (content, size) => [
    {
      tipo: 'fila',
      contenido: [
        {
          texto: content, medida: size, color: 'gris', bold: true,
        },
      ],
      repetirVeces: 1,
    },
  ];

  currentPositionY = 47;
  const text = `
SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA
SUBSECRETARÍA DE EDUCACIÓN SUPERIOR
DIRECCIÓN GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES
`;

  let pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 15;
  let contentWidth = pageWidth - marginX * 2;

  doc.text(text.trim(), 200, currentPositionY, {
    maxWidth: contentWidth,
    align: 'right',
  });
  currentPositionY += 20;

  const titleText = 'SOLICITUD PARA EL TRÁMITE DE EQUIVALENCIA DE ESTUDIOS DE EDUCACIÓN SUPERIOR';
  doc.setFont('Nutmeg', 'bold');

  const textWidth = doc.getTextWidth(titleText);
  const positionX = (pageWidth - textWidth) / 2;
  doc.text(titleText, positionX, currentPositionY);

  doc.setFont('Nutmeg', 'normal');
  currentPositionY += 10;
  let size = 40;
  let Text = 'NÚMERO DE EXPEDIENTE*';

  doc.text(Text, 100, currentPositionY);
  let content = '';
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });
  currentPositionY += 10;

  Text = 'NÚMERO DE FOLIO*';
  doc.text(Text, 100, currentPositionY);
  content = '';
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });
  currentPositionY += 15;

  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 30);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 90);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  currentPositionY += 5;
  Text = 'FECHA DE SOLICITUD*';
  doc.text(Text, 30, currentPositionY);
  Text = 'GRADO ACADÉMICO';
  doc.text(Text, 90, currentPositionY);
  content = '';
  Text = 'TIPO DE SOLICITUD';
  doc.text(Text, 150, currentPositionY);
  currentPositionY += 10;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 40);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  currentPositionY += 5;
  Text = 'N° DE ASIGNATURAS A EQUIVALER';
  doc.text(Text, 30, currentPositionY);
  Text = 'FOLIO DE RESOLUCIÓN (solo para duplicados)';
  doc.text(Text, 100, currentPositionY);

  currentPositionY += 10;
  Text = 'DATOS DEL SOLICITANTE';
  doc.setFont('Nutmeg', 'bold');

  doc.text(Text, 70, currentPositionY);

  currentPositionY += 10;
  Text = 'NOMBRE';
  doc.text(Text, 30, currentPositionY);
  doc.setFont('Nutmeg', 'normal');
  currentPositionY -= 5;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 60);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 105);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });
  currentPositionY += 5;
  Text = 'Primer apellido';
  doc.text(Text, 65, currentPositionY);
  Text = 'Segundo apellido';
  doc.text(Text, 110, currentPositionY);
  Text = 'Nombre (s)';
  doc.text(Text, 160, currentPositionY);

  currentPositionY += 10;
  Text = 'NACIMIENTO';
  doc.text(Text, 30, currentPositionY);
  currentPositionY -= 5;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 60);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 105);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });
  currentPositionY += 5;
  Text = 'Lugar';
  doc.text(Text, 75, currentPositionY);
  Text = 'Fecha';
  doc.text(Text, 120, currentPositionY);
  Text = 'Curp';
  doc.text(Text, 165, currentPositionY);

  currentPositionY += 10;
  Text = 'DOMICILIO';
  doc.text(Text, 30, currentPositionY);

  currentPositionY -= 5;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 60);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 105);
  });
  currentPositionY += 5;
  Text = 'Estado';
  doc.text(Text, 75, currentPositionY);
  Text = 'Código postal';
  doc.text(Text, 113, currentPositionY);

  currentPositionY += 10;
  Text = 'CONTACTO';
  doc.text(Text, 30, currentPositionY);
  currentPositionY -= 5;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 60);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 105);
  });
  currentPositionY -= 7;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });
  currentPositionY += 5;
  Text = 'Teléfono';
  doc.text(Text, 73, currentPositionY);
  Text = 'Correo del solicitante';
  doc.text(Text, 105, currentPositionY);
  Text = 'Correo del gestor';
  doc.text(Text, 155, currentPositionY);

  currentPositionY += 10;
  Text = 'ESTUDIOS DE PROCEDENCIA';
  doc.setFont('Nutmeg', 'bold');

  doc.text(Text, 70, currentPositionY);

  currentPositionY += 10;
  Text = 'NOMBRE DE LA INSTITUCIÓN:';
  doc.text(Text, 30, currentPositionY);
  currentPositionY -= 5;
  content = '';
  size = 90;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  currentPositionY += 7;
  Text = 'NOMBRE DE LOS ESTUDIOS CURSADOS:';
  doc.text(Text, 30, currentPositionY);
  currentPositionY -= 5;
  content = '';
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  currentPositionY += 7;
  Text = 'MUNICIPIO Y ESTADO:';
  doc.text(Text, 30, currentPositionY);
  content = '';
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  doc.addPage();
  addHeaderContent(doc);
  currentPositionY = 42;

  Text = 'ESTUDIOS DE DESTINO';
  doc.setFont('Nutmeg', 'bold');

  doc.text(Text, 70, currentPositionY);

  currentPositionY += 10;
  Text = 'NOMBRE DE LA INSTITUCIÓN:';
  doc.text(Text, 30, currentPositionY);
  content = '';
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  currentPositionY += 10;
  Text = 'NOMBRE DE LOS ESTUDIOS A CURSAR:';
  doc.text(Text, 30, currentPositionY);
  content = '';
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  currentPositionY += 10;
  Text = 'MUNICIPIO Y ESTADO:';
  doc.text(Text, 30, currentPositionY);
  content = '';
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  currentPositionY += 10;
  Text = 'TIPO DE INSTITUCIÓN:';
  doc.text(Text, 30, currentPositionY);
  content = '';
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  currentPositionY += 10;
  Text = 'RVOE:';
  doc.text(Text, 30, currentPositionY);
  content = '';
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 110);
  });
  currentPositionY += 10;
  Text = 'DOCUMENTOS PRESENTADOS*';
  doc.setFont('Nutmeg', 'bold');

  doc.text(Text, 30, currentPositionY);

  Text = 'Sí';
  doc.text(Text, 110, currentPositionY);

  Text = 'No';
  doc.text(Text, 130, currentPositionY);

  Text = 'Observaciones';
  doc.text(Text, 160, currentPositionY);

  currentPositionY += 7;
  Text = 'Acta de nacimiento';
  doc.text(Text, 30, currentPositionY);
  currentPositionY -= 5;
  size = 20;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  currentPositionY -= 7;
  size = 55;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });
  currentPositionY += 7;
  Text = 'Identificación oficial';
  doc.text(Text, 30, currentPositionY);
  size = 20;
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  size = 55;
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  currentPositionY += 7;
  Text = 'CURP';
  doc.text(Text, 30, currentPositionY);
  size = 20;
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  size = 55;
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  currentPositionY += 7;
  Text = 'Antecedente académico';
  doc.text(Text, 30, currentPositionY);
  size = 20;
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  size = 55;
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  currentPositionY += 7;
  Text = 'Certificado parcial/total';
  doc.text(Text, 30, currentPositionY);
  size = 20;
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  size = 55;
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  currentPositionY += 7;
  Text = 'Predictamen de equivalencia';
  doc.text(Text, 30, currentPositionY);
  currentPositionY -= 5;
  size = 20;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  size = 55;
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  currentPositionY += 7;
  Text = 'Comprobante de pago';
  doc.text(Text, 30, currentPositionY);
  size = 20;
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  size = 55;
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  currentPositionY += 7;
  Text = 'Plan de estudios a ingresar';
  doc.text(Text, 30, currentPositionY);

  currentPositionY -= 5;
  size = 20;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  currentPositionY -= 7;
  size = 55;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  currentPositionY += 7;
  Text = 'Otros';
  doc.text(Text, 30, currentPositionY);
  size = 20;
  currentPositionY -= 5;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 100);
  });
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 125);
  });
  size = 55;
  currentPositionY -= 7;
  field(content, size).forEach((item) => {
    switchTablas(item, doc, '', 150);
  });

  pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 30;
  const marginRight = 14;
  contentWidth = pageWidth - marginLeft - marginRight;

  doc.setFont('Nutmeg', 'normal');

  doc.setTextColor(0, 0, 0);

  Text = 'Los campos marcados con * son de llenado de la SICyT.\nLa emisión de este registro de solicitud no garantiza la obtención de la resolución de la equivalencia de estudios, esta dependerá del cumplimiento oportuno de los lineamientos.\nLos datos registrados y la documentación anexada en la solicitud son los que usted ha proporcionado, al registrarlos manifiesta que son verídicos, por tanto, si es que se llegara a detectar información falsa o documentación apócrifa anexa a esta solicitud, acepta la cancelación de la solicitud de equivalencia en su caso otorgado, independientemente de las consecuencias legales que haya lugar.\nLos interesados con resoluciones de equivalencia de estudios improcedentes, gozarán de un plazo de cinco días hábiles, contados a partir del día siguiente en que se les notifique la resolución, para presentar ante esta Secretaría el escrito en el que expresen los motivos de su inconformidad.\nTranscurrido ese plazo sin que este se presente, la resolución sólo podrá someterse a análisis de modificación, cuando se realice un nuevo pago de derechos; este también se realizará en caso de solicitar un cambio de plan de estudios por tratarse de una nueva solicitud de equivalencia.\nLa Secretaría de Innovación, Ciencia y Tecnología con domicilio en Av. Faro N° 2350, Col. Verde Valle, C.P. 44550, Guadalajara, Jalisco, es la autoridad responsable del uso y protección de sus datos personales, puede consultar las políticas de privacidad en https://sicyt.jalisco.gob.mx/politica-de-privacidad.';
  currentPositionY += 10;
  doc.text(Text, marginLeft, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });

  Text = 'Firma del interesado';
  currentPositionY += 80;
  doc.text(Text, 100, currentPositionY);

  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarSolicitudEquivalencia };
