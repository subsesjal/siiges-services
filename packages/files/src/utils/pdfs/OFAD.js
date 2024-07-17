/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  niveles,
} = require('./constants');
const {
  crearSeccion,
  formatearFecha,
  configurarFuenteYAgregarTexto,
  agregarImagenYPaginaPie,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarOFAD(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  const tipoDeSolicitud = solicitud.tipoSolicitudId === 1 ? 'OFICIO ADMISORIO DE RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS' : 'OFICIO ADMISORIO DE REFRENDO DEL RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS';

  let content = `SECRETARÍA DE INNOVACIÓN CIENCIA Y TECNOLOGÍA
  SUBSECRETARÍA DE EDUCACIÓN SUPERIOR
  DIRECCIÓN GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES
`;

  currentPositionY = crearSeccion(currentPositionY, doc, content, 'right');
  currentPositionY += 15;

  content = `${solicitud?.oficioAdmisorio || 'Folio'}`;

  currentPositionY = crearSeccion(currentPositionY, doc, content, 'right');
  currentPositionY += 20;

  const fecha = formatearFecha(solicitud?.fechaRecepcion || 'ALO');

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], `Guadalajara, Jalisco; ${fecha.toLowerCase()}`, 120, 88);
  currentPositionY = crearSeccion(currentPositionY, doc, tipoDeSolicitud, 'center');

  currentPositionY += 10;

  content = `  C. ${solicitud.programa.plantel.institucion.rector.persona.nombre.toUpperCase()} ${solicitud.programa.plantel.institucion.rector.persona.apellidoPaterno.toUpperCase()} ${solicitud.programa.plantel.institucion.rector.persona.apellidoMaterno.toUpperCase()}
  ${solicitud.programa.plantel.institucion.nombre.toUpperCase()}
  PRESENTE`;

  currentPositionY = crearSeccion(currentPositionY, doc, content, 'left');
  currentPositionY += 15;

  const textoInicialRVOE = solicitud.tipoSolicitudId === 1 ? `Que en relación a su solicitud para obtener el Reconocimiento de Validez Oficial de Estudios (RVOE) presentada en esta Dirección General de Incorporación y Servicios Escolares, con fecha ${fecha.toLowerCase()}, a través de la cual pretende ofertar e impartir` : `Que en relación a su solicitud para refrendo (actualización) el Reconocimiento de Validez Oficial de Estudios (RVOE) presentada en esta Dirección General de Incorporación y Servicios Escolares, con fecha ${fecha.toLowerCase()}, a través de la cual pretende continuar impartiendo`;

  const nombreNivel = niveles
    .find(({ id }) => +id === solicitud?.programa.nivelId).descripcion;

  const tieneNumeroInterior = solicitud.programa.plantel.domicilio.numeroInterior ? ` número interior ${solicitud.programa.plantel.domicilio.numeroInterior},` : '';

  content = `${textoInicialRVOE} el plan y programa de estudio de la ${nombreNivel} en ${solicitud.programa.nombre} con número de Folio ${solicitud.folio}, en el domicilio ${solicitud.programa.plantel.domicilio.calle}, número ${solicitud.programa.plantel.domicilio.numeroExterior},${tieneNumeroInterior} colonia ${solicitud.programa.plantel.domicilio.colonia} me permitió informarle que esta Dirección tiene a bien emitir el presente oficio admisorio en virtud de haber presentado toda la documentación administrativa y académica requerida para continuar con cada una de las etapas establecidas en el Instructivo para la Obtención del Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco ${fecha}.`;

  currentPositionY = crearSeccion(currentPositionY, doc, content, 'justify');
  currentPositionY += 35;

  content = 'En uso de las facultades que me confiere en el artículo 3° fracción VI de la Constitución Política de los Estados Unidos Mexicanos; capítulo II del Reconocimiento de Validez Oficial de Estudios de la Ley de Educación Superior del Estado de Jalisco.';

  currentPositionY = crearSeccion(currentPositionY, doc, content, 'justify');
  currentPositionY += 15;

  content = 'Sin otro particular, hago propicia la ocasión para enviarle un cordial saludo.';

  currentPositionY = crearSeccion(currentPositionY, doc, content, 'justify');
  currentPositionY += 15;

  currentPositionY = crearSeccion(
    currentPositionY,
    doc,
    'ATENTAMENTE',
    'center',
  );
  currentPositionY += 20;
  currentPositionY = crearSeccion(
    currentPositionY,
    doc,
    'ING. MARCO ARTURO CASTRO AGUILERA',
    'center',
  );
  currentPositionY += 5;
  currentPositionY = crearSeccion(
    currentPositionY,
    doc,
    'DIRECTOR GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES',
    'center',
  );
  currentPositionY += 5;
  // eslint-disable-next-line no-unused-vars
  currentPositionY = crearSeccion(
    currentPositionY,
    doc,
    'Y SERVICIOS ESCOLARES',
    'center',
  );

  agregarImagenYPaginaPie(doc, img3);
  const pdfDataUri = doc.output('arraybuffer');

  return pdfDataUri;
}

module.exports = { GenerarOFAD };
