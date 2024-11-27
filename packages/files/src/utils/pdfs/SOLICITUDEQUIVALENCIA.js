const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

const NutmegFont = fs.readFileSync(path.resolve(__dirname, '../../../../../fonts/nutmeg-regular.ttf')).toString('base64');
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
let totalCreditos = 0;
let totalCalificacion = 0;
let cantCalificacion = 0;

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

  if (bold) {
    doc.setTextColor(0, 0, 0);
    doc.text(text, textoX + 0.15, y + 5);
  }

  let setFillColor = [0, 0, 0];
  if (text.includes('FDA') || text.includes('FDP')) {
    setFillColor = [255, 255, 255];
  }

  doc.setTextColor(setFillColor[0], setFillColor[1], setFillColor[2]);
  doc.text(text, textoX, y + 5);
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

function GenerarSolicitudEquivalencia(alumno, calificaciones) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  doc.addFileToVFS('nutmeg-regular.ttf', NutmegFont);
  doc.addFont('nutmeg-regular.ttf', 'Nutmeg', 'normal');
  doc.setFont('Nutmeg', 'normal');

  const alumnoData = alumno.dataValues;
  const programa = alumnoData.programa.dataValues;
  const plantel = programa.plantel.dataValues;
  const institucion = plantel.institucion.dataValues;
  const statusStudent = buscarDescripcionPorId(situaciones, alumnoData.estatus);
  const levelBachelor = buscarDescripcionPorId(niveles, programa.nivelId);
  const agrupadosPorCiclo = {};
  calificaciones.forEach((calificacion) => {
    const cicloEscolarData = calificacion.dataValues.grupo.dataValues.cicloEscolar.dataValues;
    const cicloEscolarNombre = cicloEscolarData.nombre;

    if (!agrupadosPorCiclo[cicloEscolarNombre]) {
      agrupadosPorCiclo[cicloEscolarNombre] = {
        nombreCicloEscolar: cicloEscolarNombre,
        asignatura: [],
        calificaciones: [],
      };
    }
    const asignaturaData = calificacion.dataValues.asignatura.dataValues;
    totalCalificacion += parseFloat(calificacion.dataValues.calificacion);
    totalCreditos += parseFloat(asignaturaData.creditos);
    cantCalificacion += 1;
    agrupadosPorCiclo[cicloEscolarNombre].asignatura.push({
      nombre: calificacion.dataValues.asignatura.dataValues.nombre,
      clave: calificacion.dataValues.asignatura.dataValues.clave,
      seriacion: calificacion.dataValues.asignatura.dataValues.seriacion,
      tipo: calificacion.dataValues.asignatura.dataValues.seriacion,
      creditos: calificacion.dataValues.asignatura.dataValues.creditos,
    });
    agrupadosPorCiclo[cicloEscolarNombre].calificaciones.push({
      id: calificacion.dataValues.id,
      alumnoId: calificacion.dataValues.alumnoId,
      grupoId: calificacion.dataValues.grupoId,
      asignaturaId: calificacion.dataValues.asignaturaId,
      calificacion: calificacion.dataValues.calificacion,
      fechaExamen: calificacion.dataValues.fechaExamen,
      tipo: calificacion.dataValues.tipo,
      createdAt: calificacion.dataValues.createdAt,
      updatedAt: calificacion.dataValues.updatedAt,
      deletedAt: calificacion.dataValues.deletedAt,
    });
  });
  const notesByCicle = Object.values(agrupadosPorCiclo);
  const promedio = totalCalificacion / cantCalificacion;
  const firstTableData = {
    nombreInstitucion: institucion.nombre,
    claveCentroTrabajo: plantel.claveCentroTrabajo,
    acuerdo: programa.acuerdoRvoe,
    nivelNombre: `${levelBachelor} En ${programa.nombre}`,
  };

  redefineAddPage(doc);
  addHeaderContent(doc);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'HISTORIAL ACADÉMICO', 15, 50);
  currentPositionY -= 10;
  institutionTable(firstTableData).forEach((item) => {
    switchTablas(item, doc, '');
  });

  currentPositionY += 10;
  const tableTitle = 'DATOS DEL ALUMNO';

  studentDataTable(alumnoData, statusStudent).forEach((item) => {
    switchTablas(item, doc, tableTitle);
  });

  currentPositionY += 10;
  notesByCicle.forEach((cicleData) => {
    scholarCicleTable(cicleData).forEach((item) => {
      switchTablas(item, doc, tableTitle);
    });
    currentPositionY += 10;
  });
  promedioTable(promedio, totalCreditos, programa.creditos).forEach((item) => {
    switchTablas(item, doc, tableTitle);
  });
  currentPositionY += 10;
  const today = formatearFecha(new Date());
  const finalText = `El  presente  historial  consigna  las  calificaciones que hasta la fecha han sido registradas en el Sistema Integral de Información para la Gestión de la Educación Superior (SIIGES), el cumplimiento parcial o total del plan de estudios, los créditos obtenidos y la calificación total o parcial serán acreditados solamente por un certificado autorizado. La información del presente cumple fines informativos, único para la consulta de la Institución y la Dirección de Servicios Escolares, fecha de consulta: ${today}.`;
  const marginX = 14;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - marginX * 2;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(finalText, marginX, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });
  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');

  return pdfDataUri;
}

module.exports = { GenerarSolicitudEquivalencia };
