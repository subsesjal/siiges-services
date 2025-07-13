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
  addNutmeg,
} = require('./pdfHandler');

const img5 = fs.readFileSync(path.join(__dirname, '/images/img5.png'), { encoding: 'base64' });
const img4 = fs.readFileSync(path.join(__dirname, '/images/img4.png'), { encoding: 'base64' });

function GenerarFDA01(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  addNutmeg(doc);
  let currentPositionY = 20;

  const fechaRecepcion = solicitud.fechaRecepcion && new Date(solicitud.fechaRecepcion);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('es-MX', options);
  const dateFormatted = solicitud.fechaRecepcion && formatter.format(fechaRecepcion).toUpperCase();
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);
  const TIPO_SOLICITUD_MAPPING = {
    1: 'RECONOCIMIENTO DE VALIDEZ OFICIAL DE ESTUDIOS (RVOE)',
    2: 'REFRENDO DEL PLAN Y PROGRAMA DE ESTUDIO',
    3: 'CAMBIO DE DOMICILIO',
  };
  const tipoSolicitud = TIPO_SOLICITUD_MAPPING[solicitud.tipoSolicitudId] || 'TIPO DE SOLICITUD DESCONOCIDO';

  const ratificacionesNombre = solicitud?.programa?.plantel?.institucion?.ratificacionesNombre[0]
    || {};

  const nombreInstitucion = ratificacionesNombre.esNombreAutorizado
    ? solicitud?.programa?.plantel?.institucion?.nombre || ''
    : `${ratificacionesNombre.nombrePropuesto1}, ${ratificacionesNombre.nombrePropuesto2}, ${ratificacionesNombre.nombrePropuesto3}`;

  const turnoTipo = generarTiposDeTurno(solicitud.programa.programaTurnos);
  const nombreNivel = niveles
    .find(({ id }) => +id === solicitud?.programa.nivelId).descripcion;

  doc.addImage(img4, 'JPEG', 60, 9, 100, 23);

  doc.setFillColor(116, 200, 210);
  crearCelda(doc, 165, 40, 30, 7, 'FDA01', 10);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [116, 200, 210], 'OFICIO DE ENTREGA DE DOCUMENTACIÓN', 15, 50);
  currentPositionY += 40;
  let content = `
  FANNY GUADALUPE VALDIVIA MÁRQUEZ
  SUBSECRETARIA DE EDUCACIÓN SUPERIOR
  `;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'left');
  content = `
  AT´N: MARCO ARTURO CASTRO AGUILERA
  DIRECTOR GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES
  AT´N: MARGARITA FLORES MÁRQUEZ
  DIRECTORA DE INCORPORACIÓN

  ${dateFormatted || ''}
  `;
  currentPositionY += 15;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'right');
  configurarFuenteYAgregarTexto(doc, 'normal', 12, [0, 0, 0], '', 100, 58);
  content = `Por este conducto manifiesto que estoy en condiciones para iniciar el trámite de SOLICITUD DE ${tipoSolicitud} del programa ${nombreNivel.toUpperCase()} en ${solicitud.programa.nombre.toUpperCase()}, modalidad ${modalidadTipo.toUpperCase()} en periodos ${ciclosTipo.toUpperCase()}, turno ${turnoTipo.toUpperCase()}, de la Institución ${nombreInstitucion.toUpperCase()}.

  `;
  const marginX = 14;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - marginX * 2;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  currentPositionY += 35;
  doc.text(content, marginX, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });
  content = 'Así mismo declaro Bajo Protesta de Decir la Verdad que la información y los documentos anexos en la presente solicitud son verídicos y fueron elaborados siguiendo principios éticos profesionales, que son de mi conocimiento las penas en que incurren quienes se conducen con falsedad ante autoridad distinta de la judicial, y señaló como domicilio para recibir notificaciones:';
  currentPositionY += 20;
  doc.text(content, marginX, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });
  content = `${solicitud.programa.plantel.domicilio.calle}, N° ${solicitud.programa.plantel.domicilio.numeroExterior}, ${solicitud.programa.plantel.domicilio.colonia}, ${solicitud.programa.plantel.domicilio.municipio.nombre}.`;
  currentPositionY += 25;
  doc.text(content, marginX, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });
  content = solicitud.programa.plantel.telefono1;
  currentPositionY += 6;
  doc.text(content, marginX, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });
  content = solicitud.programa.plantel.telefono2;
  currentPositionY += 6;
  doc.text(content, marginX, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });
  content = 'Quedo enterado de todas las disposiciones establecidas en la Ley General de Educación, la Ley General de Educación Superior, la Ley de Educación del Estado Libre y Soberano de Jalisco, la Ley de Educación Superior del Estado de Jalisco, así como del Instructivo para la obtención de Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco.';
  currentPositionY += 10;
  doc.text(content, marginX, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });
  content = 'BAJO PROTESTA DE DECIR VERDAD';
  currentPositionY += 70;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'center');
  content = `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`;
  currentPositionY += 5;
  crearSeccion(currentPositionY, doc, content, 'center');
  agregarImagenYPaginaPie(doc, img5);

  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarFDA01 };
