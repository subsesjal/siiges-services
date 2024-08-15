const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const {
  crearCelda, crearSeccion,
  agregarTextoJustificado,
  agregarImagenYPaginaPie,
  configurarFuenteYAgregarTexto,
  formatearFecha,
  generarTiposDeTurno,
  buscarDescripcionPorId,
} = require('./pdfHandler');
const {
  modalidades, ciclos,
} = require('./constants');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'RVOE');
}
function redefineAddPage(doc) {
  const originalAddPage = doc.addPage;
  doc.addPage = function (...args) {
    originalAddPage.apply(this, args);
    addHeaderContent(this);
    return this;
  };
}

function GenerarRVOE(solicitud) {
  const doc = new jsPDF();
  const fechaInicial = new Date(solicitud?.programa?.fechaSurteEfecto);
  const esLicenciatura = /licenciatura/i.test(solicitud?.programa?.nombre);
  const vigencia = esLicenciatura ? 'un año seis meses' : 'cuatro años seis meses';
  let años = 0;
  let meses = 0;

  if (vigencia === 'un año seis meses') {
    años = 1;
    meses = 6;
  } else if (vigencia === 'cuatro años seis meses') {
    años = 4;
    meses = 6;
  }
  fechaInicial.setFullYear(fechaInicial.getFullYear() + años);
  fechaInicial.setMonth(fechaInicial.getMonth() + meses);
  const fechaDespuesVigencia = formatearFecha(fechaInicial);
  const ciclosDuracionMeses = {
    Semestral: 6,
    Cuatrimestral: 4,
    Anual: 12,
    'Semestral curriculum flexible': 6,
    'Cuatrimestral curriculum flexible': 4,
  };
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);
  const mesesPorCiclo = ciclosDuracionMeses[ciclosTipo];
  const { duracionPeriodos } = solicitud.programa;
  const duracionTotalMeses = mesesPorCiclo * parseInt(duracionPeriodos, 10);
  const duracionTotalAnos = Math.round(duracionTotalMeses / 12);
  const formatearDuracion = (anios) => `${anios} año${anios !== 1 ? 's' : ''}`;
  const duracionTexto = formatearDuracion(duracionTotalAnos);
  const turnoTipo = generarTiposDeTurno(solicitud.programa.programaTurnos);
  const TIPO_SOLICITUD_MAPPING = {
    1: 'RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS',
    2: 'REFRENDO DEL PLAN Y PROGRAMA DE ESTUDIO',
    3: 'CAMBIO DE DOMICILIO',
  };
  const tipoSolicitud = TIPO_SOLICITUD_MAPPING[solicitud.tipoSolicitudId] || 'TIPO DE SOLICITUD DESCONOCIDO';
  const fechaFormateada = formatearFecha(solicitud.createdAt);
  const fechaSurteEfectoFormateada = formatearFecha(solicitud?.programa?.fechaSurteEfecto);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  let currentPositionY = 60;
  redefineAddPage(doc);
  addHeaderContent(doc);
  const tittle = 'ACUERDO DE RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS';
  const type = '(RVOE)';
  // Add main title text
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], '', 0, 0);
  currentPositionY = crearSeccion(currentPositionY, doc, tittle, 'center');
  currentPositionY += 4;
  currentPositionY = crearSeccion(currentPositionY, doc, type, 'center');

  // Main content for page 1
  let content = `
Se expide el presente Acuerdo con fundamento en la Constitución Política de los 
Estados Unidos Mexicanos en su artículo 3 fracción VI; Ley General de Educación en 
sus artículos 146, 147, 148 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 
160, 161, 162, 163, 164, 165, 166, 167, 168,169, 170,171, 172, 173, 174, 175, 176, 
177, 178 y 179; Ley General de Educación Superior en sus artículos 5, 8, 10, 14, 18, 
22 fracción VIII, 36, 37, 39, 49, 56, 68, 69, 70, 71,72, 73, 74, 75 y 76; Ley de 
Educación del Estado Libre y Soberano de Jalisco en sus artículos 32, 45, 83, 85, 
112, 116 fracciones I y VII, 136, 141,142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 
152 y 153; Ley de Educación Superior del Estado de Jalisco en sus artículos 72, 73, 
74, 75, 76 y 77. Reglamento para la Obtención De Reconocimiento De Validez Oficial 
De Estudios en materia de incorporación de instituciones particulares para el tipo 
superior en sus artículos 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
20, 21, 22, 23, 24, 25, 26, 27, 28, 29 y 30.
`;

  configurarFuenteYAgregarTexto(doc, 'normal', 12, [0, 0, 0], '', 10, 75);
  const leftMargin = 30;
  const rightMargin = 30;

  const pageWidth = 210;
  const usableWidth = pageWidth - leftMargin - rightMargin;
  currentPositionY += 10;
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  doc.setFont('Nutmegb', 'bold');
  content = 'C O N S I D E R A N D O:';
  currentPositionY += 5;
  doc.setFontSize(12);
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'center');
  doc.setFont('Nutmegb', 'normal');
  content = `ÚNICO.- Que a la ${solicitud?.programa?.plantel?.institucion?.nombre} 
 a través de su representante legal el C. 
${solicitud?.programa?.plantel?.institucion?.rector?.persona?.nombre} 
${solicitud?.programa?.plantel?.institucion?.rector?.persona?.apellidoPaterno} 
${solicitud?.programa?.plantel?.institucion?.rector?.persona?.apellidoMaterno}, 
con fecha del ${fechaFormateada} presentó ante la Secretaría de Innovación, 
Ciencia y Tecnología, la solicitud para obtener el ${tipoSolicitud}, 
cumpliendo con la totalidad de documentos administrativos y pedagógicos, así como de las etapas 
previstas en la Ley de Educación Superior del Estado de Jalisco y en el Instructivo para la obtención 
del Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco.`;

  currentPositionY += 7;
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  doc.addPage();
  currentPositionY = 60;
  content = 'C L Á U S U L A S';
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'center');
  currentPositionY += 7;
  doc.setFont('Nutmegb', 'normal');
  content = `PRIMERA.- Se otorga el Acuerdo ${solicitud?.programa?.acuerdoRvoe} a la 
  ${solicitud?.programa?.plantel?.institucion?.nombre}, 
  representada legalmente por el C. ${solicitud?.programa?.plantel?.institucion?.rector?.persona?.nombre} 
  ${solicitud?.programa?.plantel?.institucion?.rector?.persona?.apellidoPaterno} 
  ${solicitud?.programa?.plantel?.institucion?.rector?.persona?.apellidoMaterno}, 
  para ofertar e impartir el plan y programas de estudio de ${solicitud?.programa?.nombre}, 
  en el turno ${turnoTipo}, periodos ${ciclosTipo}, ${modalidadTipo}, 
  con una duración ${duracionTexto}, autorizado con el nombre institucional de ${solicitud?.programa?.plantel?.institucion?.nombre}, 
  en el inmueble ubicado en ${solicitud?.programa?.plantel?.domicilio?.calle}, número ${solicitud?.programa?.plantel?.domicilio?.numeroExterior} ${solicitud?.programa?.plantel?.domicilio?.numeroInterior ? `, interior ${solicitud.programa.plantel.domicilio.numeroInterior}` : ''}, colonia ${solicitud?.programa?.plantel?.domicilio?.colonia}, 
  código postal ${solicitud?.programa?.plantel?.domicilio?.codigoPostal}, en el municipio de ${solicitud?.programa?.plantel?.domicilio?.municipio?.nombre}, ${solicitud?.programa?.plantel?.domicilio?.estado?.nombre}.`;
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  currentPositionY += 5;
  content = `SEGUNDA.- Que el C. ${solicitud?.programa?.plantel?.institucion?.rector?.persona?.nombre} 
  ${solicitud?.programa?.plantel?.institucion?.rector?.persona?.apellidoPaterno} 
  ${solicitud?.programa?.plantel?.institucion?.rector?.persona?.apellidoMaterno}, representante legal de la ${solicitud?.programa?.plantel?.institucion?.nombre}, queda obligada a cumplir con lo dispuesto en las Leyes enunciadas anteriormente, además del Instructivo para la obtención del Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco y demás disposiciones y lineamientos que emita la Secretaría de Innovación, Ciencia y Tecnología en la materia y se sujeta a los procesos de supervisión y vigilancia que emitan las Leyes y esta Autoridad.`;
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  currentPositionY += 5;
  content = `TERCERA.- El presente Acuerdo de Reconocimiento de Validez Oficial de Estudios es para 
  efectos eminentemente educativos, por lo que a la ${solicitud?.programa?.plantel?.institucion?.nombre}, 
  a través de su representante legal, queda obligada a obtener de las autoridades competentes todos los 
  permisos, dictámenes y licencias que procedan conforme a los ordenamientos aplicables y 
  sus disposiciones reglamentarias.`;
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  currentPositionY += 5;
  content = `CUARTA.- El Reconocimiento de Validez Oficial de Estudios que ampara el presente Acuerdo 
  aquí autorizado ${solicitud?.programa?.acuerdoRvoe}, surtirá sus efectos a partir del ${fechaSurteEfectoFormateada}. 
  El Acuerdo no es transferible y su vigencia será de ${vigencia}, contados a partir de 
  que surta efectos. A su vencimiento, deberá realizarse el trámite de refrendo de dicho plan y 
  programas de estudio. Por lo anterior se instaura como fecha de vencimiento el día ${fechaDespuesVigencia}. 
  Cualquier acuerdo posterior a este que modifique el número de RVOE, como lo es el cambio de domicilio o 
  la modificación de nombre institucional, NO interrumpirá ni generará una nueva vigencia para el acuerdo 
  presente.`;
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  currentPositionY += 5;
  content = 'Cualquier acuerdo posterior a este que modifique el número de RVOE, como lo es el cambio de domicilio o la modificación de nombre institucional, NO interrumpirá ni generará una nueva vigencia para el acuerdo presente.';
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  currentPositionY += 5;
  content = 'Se aclara que el actual acuerdo de RVOE continuará vigente en tanto no concluya la última generación de alumnos ya inscritos en dicho plan, a la fecha de entrada en vigor de este acuerdo y posterior a ello quedará sin efectos.';
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  content = 'QUINTA.- En caso de que desee suspender definitivamente la prestación del servicio educativo, el C. Salvador Jiménez Esparza, se obliga a dar aviso por escrito a la Secretaría de Innovación, Ciencia y Tecnología, con anticipación de por lo menos sesenta días naturales previstos a la fecha de cierre de actividades académicas, comprometiéndose además, a entregar los archivos correspondientes y no dejar alumnos inscritos con ciclos inconclusos, ni obligaciones pendientes por cumplir. Para el cumplimiento de estas obligaciones, deberán apegarse tanto al marco jurídico vigente.';
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  currentPositionY += 5;
  content = 'SEXTA.- Que el incumplimiento a cualquiera de las obligaciones derivadas de las  Leyes, Reglamentos, Políticas y Lineamientos del presente Acuerdo y las demás aplicables, será motivo para las sanciones a que diera lugar.';
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  currentPositionY += 5;
  content = 'SÉPTIMA.- Una vez otorgado el Reconocimiento de Validez Oficial de Estudio, por parte de esta Autoridad, se obliga al particular a notificar a las autoridades competentes para cualquier fin correspondiente.';
  currentPositionY = agregarTextoJustificado(doc, content, leftMargin, currentPositionY, usableWidth, 12);
  currentPositionY += 10;
  content = `Expedido en la ciudad de Guadalajara, el ${fechaSurteEfectoFormateada}`;
  crearSeccion(currentPositionY, doc, content, 'center');
  currentPositionY += 5;
  content = `${solicitud.programa.plantel.institucion?.rector?.persona?.nombre} ${solicitud.programa.plantel.institucion?.rector?.persona?.apellidoPaterno} ${solicitud.programa.plantel.institucion?.rector?.persona?.apellidoMaterno}`;
  crearSeccion(currentPositionY, doc, content, 'center');
  agregarImagenYPaginaPie(doc, img3);

  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarRVOE };
