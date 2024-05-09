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

function GenerarFDA02(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 67;

  const fechaFormateada = formatearFecha(solicitud.createdAt);
  const nombreNivel = buscarDescripcionPorId(niveles, solicitud.programa.nivelId);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);
  const turnoTipo = generarTiposDeTurno(solicitud.programa.programaTurnos);

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDA02');

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'OFICIO DE ENTREGA DE DOCUMENTACIÓN', 20, 50);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [0, 0, 0], fechaFormateada, 152, 58);

  currentPositionY += seccionIntitucionTabla({
    doc, solicitud, niveles, currentPositionY,
  });

  currentPositionY = updateCurrentPositionY(doc);

  const headers = ['NIVEL DE ESTUDIO', 'TURNO', 'MODALIDAD', 'CICLO'];
  const tablePrograma = [[nombreNivel, turnoTipo, modalidadTipo, ciclosTipo]];
  generateTableWithStyles(headers, tablePrograma, doc, currentPositionY);

  currentPositionY = updateCurrentPositionY(doc);

  const tablaData1 = generarTablaData(['CALLE Y NÚMERO', 'COLONIA'], [
    [
      `${solicitud.programa.plantel.domicilio.calle
      }  ${solicitud.programa.plantel.domicilio.numeroExterior}`,
      solicitud.programa.plantel.domicilio.colonia,
    ],
  ]);
  currentPositionY += generateTableAndSection('DOMICILIO DE LA INSTITUCIÓN', tablaData1, doc, currentPositionY);

  currentPositionY = updateCurrentPositionY(doc, -20);

  const headers2 = [
    'CÓDIGO POSTAL',
    'DELEGACIÓN O MUNICIPIO',
    'ENTIDAD FEDERATIVA',
  ];
  const tableData2 = [
    [
      solicitud.programa.plantel.domicilio.codigoPostal,
      solicitud.programa.plantel.domicilio.municipio.nombre,
      solicitud.programa.plantel.domicilio.estado.nombre,
    ],
  ];
  generateTableWithStyles(headers2, tableData2, doc, currentPositionY + 20);

  currentPositionY = updateCurrentPositionY(doc, -20);

  const headers3 = [
    'NÚMERO TELEFÓNICO',
    'REDES SOCIALES',
    'CORREO ELECTRÓNICO',
  ];
  const tableData3 = [
    [
      `${solicitud.programa.plantel.telefono1},\n${solicitud.programa.plantel.telefono2},\n${solicitud.programa.plantel.telefono3}`,
      solicitud.programa.plantel.redesSociales,
      `${solicitud.programa.plantel.correo1},\n${solicitud.programa.plantel.correo2},\n${solicitud.programa.plantel.correo3}`,
    ],
  ];
  generateTableWithStyles(headers3, tableData3, doc, currentPositionY + 20);

  currentPositionY = updateCurrentPositionY(doc);

  const tituloRepresentante = 'DATOS DEL SOLICITANTE (PERSONA FÍSICA O REPRESENTANTE LEGAL DE LA PERSONA JURÍDICA';
  const tablaRepresentante = {
    headers: ['Nombre', 'datos'],
    body: [
      ['NOMBRE (S)', solicitud.usuario.persona.nombre],
      ['APELLIDO PATERNO', solicitud.usuario.persona.apellidoPaterno],
      ['APELLIDO MATERNO', solicitud.usuario.persona.apellidoMaterno],
      ['NACIONALIDAD', solicitud.usuario.persona.nacionalidad],
    ],
    showHead: false,
    columnStyles: {
      0: {
        fillColor: [172, 178, 183],
      },
      1: {
        fontStyle: 'bold',
      },
    },
  };

  currentPositionY += generateTableAndSection(
    tituloRepresentante,
    tablaRepresentante,
    doc,
    currentPositionY,
  );
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda

  const headers6 = ['CALLE Y NÚMERO', 'COLONIA'];
  const tableData6 = [
    [
      `${solicitud.programa.plantel.domicilio.calle
      }  ${
        solicitud.programa.plantel.domicilio.numeroExterior}`,
      solicitud.programa.plantel.domicilio.estado.nombre,
    ],
  ];
  generateTableWithStyles(headers6, tableData6, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda

  const headers7 = [
    'CÓDIGO POSTAL',
    'DELEGACIÓN O MUNICIPIO',
    'ENTIDAD FEDERATIVA',
  ];
  const tableData7 = [
    [
      solicitud.programa.plantel.domicilio.codigoPostal,
      solicitud.programa.plantel.domicilio.municipio.nombre,
      solicitud.programa.plantel.domicilio.estado.nombre,
    ],
  ];
  generateTableWithStyles(headers7, tableData7, doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc, 20);
  const headers8 = ['NÚMERO TELEFÓNICO', 'CORREO ELECTRÓNICO'];
  const tableData8 = [[solicitud.usuario.persona.celular, solicitud.usuario.persona.correo]];
  generateTableWithStyles(headers8, tableData8, doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc, 10);

  const rectorPersona = solicitud.programa.plantel.institucion?.rector?.persona;
  const tablaData9 = {
    headers: ['NOMBRE (S)', 'APELLIDO PATERNO', 'APELLIDO MATERNO'],
    body: [[rectorPersona?.nombre || ' ', rectorPersona?.apellidoPaterno || ' ', rectorPersona?.apellidoMaterno || ' ']],
  };

  currentPositionY += generateTableAndSection('DATOS DEL RECTOR', tablaData9, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;

  const headers10 = [
    'CORREO INSTITUCIONAL',
    'CORREO PERSONAL',
    'TELÉFONO CELULAR',
  ];
  const { correo: correoRector, celular: celularRector } = solicitud
    .programa.plantel.institucion.rector?.persona ?? {};
  const tableData10 = [
    ['', correoRector, celularRector],
  ];
  generateTableWithStyles(headers10, tableData10, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda

  const formacionRector = solicitud.programa.plantel
    .institucion.rector?.formacionesRectores?.formacion ?? {};
  const tablaData11 = {
    headers: ['GRADO EDUCATIVO', 'NOMBRE DE LOS ESTUDIOS'],
    body: [[formacionRector.nombre, formacionRector.institucion]],
  };

  currentPositionY += generateTableAndSection('FORMACIÓN ACADÉMICA', tablaData11, doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc, 10);

  const { directores } = solicitud.programa.plantel;

  const tablaDirectores = {
    headers: ['NOMBRE (S)', 'APELLIDO PATERNO', 'APELLIDO MATERNO'],
    body: directores?.map((director) => [
      director.persona.nombre,
      director.persona.apellidoPaterno,
      director.persona.apellidoMaterno,
    ]),
  };

  currentPositionY += generateTableAndSection('DATOS DEL DIRECTOR', tablaDirectores, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY;

  const correoDirectorHeader = [
    'CORREO INSTITUCIONAL',
    'CORREO PERSONAL',
    'TELÉFONO CELULAR',
  ];
  const correoDirectorBody = [
    ['', '', ''],
  ];

  generateTableWithStyles(correoDirectorHeader, correoDirectorBody, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda

  const formacionDirector = {
    headers: ['GRADO EDUCATIVO', 'NOMBRE DE LOS ESTUDIOS'],
    body: [
      ['', ''],
    ],
  };
  currentPositionY += generateTableAndSection('FORMACIÓN ACADÉMICA', formacionDirector, doc, currentPositionY);
  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  const { diligencias } = solicitud;

  if (diligencias && diligencias.length) {
    diligencias.forEach((diligente, index) => {
      const nombreDiligente = `${diligente.persona.nombre} ${diligente.persona.apellidoPaterno} ${diligente.persona.apellidoMaterno}`;
      const tablaDataDiligencia = {
        headers: ['Nombre', 'datos'],
        body: [
          ['NOMBRE COMPLETO', nombreDiligente],
          ['CARGO', ''],
          ['NÚMERO TELEFÓNICO', diligente.persona.celular || '4747466124, 3787900984'],
          ['CORREO ELECTRÓNICO', diligente.persona.correoPrimario || 'primer@gmail.com'],
          [
            'HORARIO DE ATENCIÓN',
            `${new Date(diligente.horaInicio).getHours()} horas a la(s) ${new Date(diligente.horaFin).getHours()} horas` || '9 A 14 Y DE 16 A 19 HORAS',
          ],
        ],
        showHead: false,
        columnStyles: {
          0: {
            fillColor: [172, 178, 183],
          },
          1: {
            fontStyle: 'bold',
          },
        },
      };
      currentPositionY += generateTableAndSection(`Diligente ${index + 1}`, tablaDataDiligencia, doc, currentPositionY);
    });
  }
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda

  currentPositionY = updateCurrentPositionY(doc, 10);

  const nombresPropuestos = {
    headers: ['Nombre', 'datos'],
    body: [
      ['NOMBRE PROPUESTO No. 1', '                                                             '],
      ['NOMBRE PROPUESTO No. 2', '                                                             '],
      ['NOMBRE PROPUESTO No. 3', '                                                             '],
    ],
    showHead: false,
    columnStyles: {
      0: {
        fillColor: [172, 178, 183],
      },
      1: {
        fontStyle: 'bold',
      },
    },
  };

  currentPositionY = updateCurrentPositionY(doc); // Espacio después de la celda

  currentPositionY += generateTableAndSection('NOMBRES PROPUESTOS PARA LA INSTITUCIÓN EDUCATIVA', nombresPropuestos, doc, currentPositionY);
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 30;

  currentPositionY += crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda
  currentPositionY += 35;
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
