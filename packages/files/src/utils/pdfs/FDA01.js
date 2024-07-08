/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const {
  ciclos, modalidades, niveles,
} = require('./constants');
const {
  crearCelda, crearSeccion,
  agregarImagenYPaginaPie,
  configurarFuenteYAgregarTexto,
  buscarDescripcionPorId,
  generarTiposDeTurno,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDA01(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 20;

  const fechaRecepcion = new Date(solicitud.fechaRecepcion);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('es-MX', options);
  const fechaFormateada = formatter.format(fechaRecepcion).toUpperCase();
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);
  let tipoSolicitud = '';
  if (solicitud.tipoSolicitudId === 1) {
    tipoSolicitud = 'RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS';
  } else if (solicitud.tipoSolicitudId === 2) {
    tipoSolicitud = 'REFRENDO DEL PLAN Y PROGRAMA DE ESTUDIO';
  } else if (solicitud.tipoSolicitudId === 3) {
    tipoSolicitud = 'CAMBIO DE DOMICILIO';
  } else {
    tipoSolicitud = 'TIPO DE SOLICITUD DESCONOCIDO'; // Por si el valor no coincide con ninguno de los casos
  }
  const turnoTipo = generarTiposDeTurno(solicitud.programa.programaTurnos);
  const nombreNivel = niveles
    .find(({ id }) => +id === solicitud?.programa.nivelId).descripcion;
  // Add header images
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 165, 40, 30, 7, 'FDA01');

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'OFICIO DE ENTREGA DE DOCUMENTACIÓN', 20, 50);
  currentPositionY += 40;
  // Main content section
  let content = `
  JOSÉ ROSALIO MUÑOZ CASTRO
  SUBSECRETARIO DE EDUCACIÓN SUPERIOR
  `;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'left');
  content = `
  AT´N: MARCO ARTURO CASTRO AGUILERA 
  DIRECTOR GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES
  AT´N: MARGARITA FLORES MÁRQUEZ 
  DIRECTORA DE INCORPORACIÓN
  
  ${fechaFormateada}
  `;
  currentPositionY += 15;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'right');
  content = `
Por este conducto manifiesto que estoy en condiciones para iniciar el ${tipoSolicitud} del programa ${nombreNivel} en ${solicitud.programa.nombre}, ${modalidadTipo} en periodos ${ciclosTipo}, turno ${turnoTipo} de la institución ${solicitud.programa.plantel.institucion.nombre}.

Así mismo declaro Bajo Protesta de Decir la Verdad que la información y los documentos anexos en la presente solicitud son verídicos y fueron elaborados siguiendo principios éticos profesionales, que son de mi conocimiento las penas en que incurren quienes se conducen con falsedad ante autoridad distinta de la judicial, y señaló como domicilio para recibir notificaciones:

${solicitud.programa.plantel.domicilio.calle}, N° ${solicitud.programa.plantel.domicilio.numeroExterior}, ${solicitud.programa.plantel.domicilio.colonia}, ${solicitud.programa.plantel.domicilio.municipio.nombre}.
${solicitud.programa.plantel.telefono1}
${solicitud.programa.plantel.telefono2}

Quedo enterado de todas las disposiciones establecidas en la Ley General de Educación, la Ley General de Educación Superior, la Ley de Educación del Estado Libre y Soberano de Jalisco, la Ley de Educación Superior del Estado de Jalisco, así como del Instructivo para la obtención de Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco.
  `;
  currentPositionY += 30;
  configurarFuenteYAgregarTexto(doc, 'normal', 12, [0, 0, 0], '', 100, 58);
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'left');
  content = 'BAJO PROTESTA DE DECIR VERDAD';
  currentPositionY += 100;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'center');
  content = `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`;
  currentPositionY += 5;
  crearSeccion(currentPositionY, doc, content, 'center');

  // Add footer image and page number
  agregarImagenYPaginaPie(doc, img3);

  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarFDA01 };
