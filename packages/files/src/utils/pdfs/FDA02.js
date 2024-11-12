const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  ciclos, modalidades, niveles,
} = require('./constants');
const {
  HEADER_TABLA_REDES_SOCIALES,
  HEADER_TABLA_DOMICILIO2,
  TITLE_DOMICILIO,
  HEADER_TABLA_DOMICILIO,
  HEADER_TABLA_ESTUDIANTIL,
  tituloRepresentante,
  HEADER_NOMBRE_DATOS,
  TABLA_REPRESENTANTE,
  rowsDomicilio2,
  rowsDomicilio,
  HEADER_TABLA_CORREO,
  HEADER_NOMBRE_PUESTO,
  diligenteBody,
  columnStyles,
  HEADER_GRADO_EDUCATIVO,
} = require('./constants/fd02-constants');
const {
  crearCelda, crearSeccion,
  seccionIntitucionTabla,
  formatearFecha,
  buscarDescripcionPorId,
  generarTiposDeTurno,
  configurarFuenteYAgregarTexto,
  generateTableWithStyles,
  updateCurrentPositionY,
  generateTableAndSection,
  generarTablaData,
  agregarImagenYPaginaPie,
} = require('./pdfHandler');

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
  const nombreNivel = buscarDescripcionPorId(niveles, solicitud.programa.nivelId);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);
  const turnoTipo = generarTiposDeTurno(solicitud.programa.programaTurnos);

  redefineAddPage(doc);
  addHeaderContent(doc);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'OFICIO DE ENTREGA DE DOCUMENTACIÓN', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);

  const rowsEstudiantil = [[nombreNivel, turnoTipo, modalidadTipo, ciclosTipo]];
  generateTableWithStyles(HEADER_TABLA_ESTUDIANTIL, rowsEstudiantil, doc, currentPositionY);

  currentPositionY = updateCurrentPositionY(doc);

  const domicilioData = generarTablaData(
    HEADER_TABLA_DOMICILIO,
    rowsDomicilio(solicitud.programa.plantel.domicilio),
  );

  currentPositionY += generateTableAndSection(
    TITLE_DOMICILIO,
    domicilioData,
    doc,
    currentPositionY,
  );

  currentPositionY = updateCurrentPositionY(doc, -20);
  generateTableWithStyles(
    HEADER_TABLA_DOMICILIO2,
    rowsDomicilio2(solicitud.programa.plantel.domicilio),
    doc,
    currentPositionY + 20,
  );

  currentPositionY = updateCurrentPositionY(doc, -20);

  const rowsRedesSociales = [
    [
      `${solicitud.programa.plantel.telefono1},\n${solicitud.programa.plantel.telefono2},\n${solicitud.programa.plantel.telefono3}`,
      solicitud.programa.plantel.redesSociales,
      `${solicitud.programa.plantel.correo1},\n${solicitud.programa.plantel.correo2},\n${solicitud.programa.plantel.correo3}`,
    ],
  ];
  generateTableWithStyles(
    HEADER_TABLA_REDES_SOCIALES,
    rowsRedesSociales,
    doc,
    currentPositionY + 20,
  );

  currentPositionY = updateCurrentPositionY(doc);

  const tablaRepresentante = {
    headers: HEADER_NOMBRE_DATOS,
    body: TABLA_REPRESENTANTE(solicitud.usuario.persona),
    showHead: false,
    columnStyles,
  };

  currentPositionY += generateTableAndSection(
    tituloRepresentante,
    tablaRepresentante,
    doc,
    currentPositionY,
  );
  currentPositionY = doc.previousAutoTable.finalY;

  generateTableWithStyles(
    HEADER_TABLA_DOMICILIO,
    rowsDomicilio(solicitud.programa.plantel.domicilio),
    doc,
    currentPositionY,
  );
  currentPositionY = doc.previousAutoTable.finalY;

  generateTableWithStyles(
    HEADER_TABLA_DOMICILIO2,
    rowsDomicilio2(solicitud.programa.plantel.domicilio),
    doc,
    currentPositionY,
  );
  doc.addPage();
  currentPositionY = 55;
  const rowsRedesSocialesSolicitante = [
    [
      `${solicitud?.usuario?.persona?.telefono}`,
      solicitud?.usuario?.persona?.redesSociales,
      `${solicitud?.usuario?.persona?.correoPrimario}}`,
    ],
  ];
  generateTableWithStyles(
    HEADER_TABLA_REDES_SOCIALES,
    rowsRedesSocialesSolicitante,
    doc,
    currentPositionY,
  );
  currentPositionY = updateCurrentPositionY(doc, 10);
  const rectorPersona = solicitud.programa.plantel.institucion?.rector?.persona;
  const tablaNombreYApellido = {
    headers: ['NOMBRE (S)', 'PRIMER APELLIDO', 'SEGUNDO APELLIDO'],
    body: [[rectorPersona?.nombre || ' ', rectorPersona?.apellidoPaterno || ' ', rectorPersona?.apellidoMaterno || ' ']],
  };

  currentPositionY += generateTableAndSection('DATOS DEL RECTOR', tablaNombreYApellido, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;
  const correoInst = solicitud.programa.plantel.institucion.rector?.persona?.correoPrimario;
  const correoRector = solicitud.programa.plantel.institucion.rector?.persona?.correoSecundario;
  const celularRector = solicitud.programa.plantel.institucion.rector?.persona?.celular;
  const tableCorreoRector = [
    [correoInst, correoRector, celularRector],
  ];
  generateTableWithStyles(HEADER_TABLA_CORREO, tableCorreoRector, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;
  generateTableWithStyles(HEADER_TABLA_CORREO, tableCorreoRector, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;
  currentPositionY = updateCurrentPositionY(doc, 10);

  const { directores } = solicitud.programa.plantel;
  const tablaDirectores = {
    headers: ['NOMBRE (S)', 'PRIMER APELLIDO', 'SEGUNDO APELLIDO'],
    body: directores?.map((director) => [
      director.persona.nombre,
      director.persona.apellidoPaterno,
      director.persona.apellidoMaterno,
    ]),
  };

  currentPositionY += generateTableAndSection('DATOS DEL DIRECTOR', tablaDirectores, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;

  const correoDirectorBody = solicitud.programa.plantel.directores.map((director) => [
    director.persona.correoPrimario || 'No disponible',
    director.persona.correoSecundario || 'No disponible',
    director.persona.telefono || 'No disponible',
  ]);

  generateTableWithStyles(HEADER_TABLA_CORREO, correoDirectorBody, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;
  const formacionesBody = [];
  solicitud.programa.plantel.directores.forEach((director) => {
    const formaciones = director.dataValues.formacionesDirectores;
    formaciones.forEach((formacion) => {
      formacionesBody.push([formacion.formacion.nivelId, formacion.formacion.nombre]);
    });
  });
  const formacionDirector = {
    headers: HEADER_GRADO_EDUCATIVO,
    body: formacionesBody,
  };

  currentPositionY += generateTableAndSection('FORMACIÓN ACADÉMICA', formacionDirector, doc, currentPositionY);
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
