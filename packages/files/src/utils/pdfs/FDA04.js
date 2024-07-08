/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  modalidades, ciclos,
} = require('./constants');
// const {
// } = require('./constants/fda04-constants');
const {
  configurarFuenteYAgregarTexto,
  updateCurrentPositionY,
  generateTableAndSection,
  agregarImagenYPaginaPie,
  buscarDescripcionPorId,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });
let currentPositionY = 67;

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.setFillColor(6, 98, 211);
  // eslint-disable-next-line no-use-before-define
  crearCelda(doc, 150, 40, 45, 7, 'FDA04');
}
function redefineAddPage(doc) {
  const originalAddPage = doc.addPage;

  // eslint-disable-next-line no-param-reassign, func-names
  doc.addPage = function (...args) {
    originalAddPage.apply(this, args);
    addHeaderContent(this);
    return this;
  };
}

function GenerarFDA04(solicitud) {
  const doc = new jsPDF();
  redefineAddPage(doc);
  addHeaderContent(doc);
  const modalidadTipo = buscarDescripcionPorId(modalidades, solicitud.programa.modalidadId);
  const ciclosTipo = buscarDescripcionPorId(ciclos, solicitud.programa.cicloId);
  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'DESCRIPCIÓN DE LAS INSTALACIONES', 20, 50);
  const tituloTabla = {
    headers: ['1', '1'],
    body: [],
    showHead: false,
  };
  currentPositionY -= 10;
  const textoCiclos = ciclosTipo === 'Semestral' ? 'Semestres' : 'Cuatrimestres';
  const tablaDatosPlan = [
    { tipo: 'titulo', contenido: '1. DATOS DEL PLAN DE ESTUDIOS' },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'NOMBRE DE LA INSTITUCIÓN', medida: 91, color: 'blanco' },
        { texto: solicitud.programa.plantel.institucion.nombre, medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'TIPO Y NOMBRE DEL PLAN DE ESTUDIOS', medida: 91, color: 'blanco' },
        { texto: '', medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'MODALIDAD', medida: 91, color: 'blanco' },
        { texto: modalidadTipo, medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'DURACIÓN DEL PROGRAMA', medida: 91, color: 'blanco' },
        { texto: `${solicitud.programa.duracionPeriodos} ${textoCiclos}`, medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        {
          texto: 'NOMBRE COMPLETO DE LA PERSONA FÍSICA O JURÍDICA',
          medida: 91,
          color: 'blanco',
          bold: true,
          tamano: 8.7,
          acomodoLetra: 'center',
        },
        { texto: '', medida: 91, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
  ];

  tablaDatosPlan.forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });

  currentPositionY = updateCurrentPositionY(doc, 40);

  const tablaDomicilio = [
    { tipo: 'titulo', contenido: '2. DOMICILIO DE LA INSTITUCIÓN' },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'CALLE Y NÚMERO', medida: 121.4, color: 'gris' },
        { texto: 'COLONIA', medida: 60.66, color: 'gris' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: solicitud.programa.plantel.domicilio.calle, medida: 121.4, color: 'blanco' },
        { texto: solicitud.programa.plantel.domicilio.colonia, medida: 60.66, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'CÓDIGO POSTAL', medida: 60.66, color: 'gris' },
        { texto: 'DELEGACIÓN O MUNICIPIO', medida: 60.66, color: 'gris' },
        { texto: 'ENTIDAD FEDERATIVA', medida: 60.66, color: 'gris' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: solicitud.programa.plantel.domicilio.codigoPostal.toString(), medida: 60.66, color: 'blanco' },
        { texto: solicitud.programa.plantel.domicilio.municipio.nombre, medida: 60.66, color: 'blanco' },
        { texto: solicitud.programa.plantel.domicilio.estado.nombre, medida: 60.66, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'NÚMERO TELEFÓNICO', medida: 60.66, color: 'gris' },
        { texto: 'REDES SOCIALES', medida: 60.66, color: 'gris' },
        { texto: 'CORREO ELECTRÓNICO', medida: 60.66, color: 'gris' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: solicitud.programa.plantel.telefono1, medida: 60.66, color: 'blanco' },
        { texto: solicitud.programa.plantel.redesSociales == null ? 'sin dato' : solicitud.programa.plantel.redesSociales, medida: 60.66, color: 'blanco' },
        { texto: solicitud.programa.plantel.correo1, medida: 60.66, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
  ];

  tablaDomicilio.forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });

  currentPositionY = updateCurrentPositionY(doc, 47);

  const tablaDescripcionPlantel = [
    { tipo: 'titulo', contenido: '3. DESCRIPCIÓN DEL PLANTEL' },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'CARACTERÍSTICAS DEL INMUEBLE', medida: 91, color: 'gris' },
        { texto: 'SISTEMA DE SEGURIDAD', medida: 91, color: 'gris' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'CONSTRUIDO PARA LA ESCUELA', medida: 81, color: 'blanco' },
        { texto: 'x', medida: 10, color: 'blanco' },
        { texto: 'Descripcion', medida: 81, color: 'blanco' },
        { texto: 'NO.', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'ADAPTADO', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
        {
          texto: 'RECUBRIMIENTOS PLÁSTICOS EN PISOS Y ESCALONES',
          medida: 81,
          color: 'blanco',
          bold: true,
          tamano: 8.3,
        },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'MIXTO', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
        {
          texto: 'ALARMA CONTRA INCENDIOS Y/O TERREMOTOS',
          medida: 81,
          color: 'blanco',
          bold: true,
          tamano: 8.7,
        },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'DIMENSIONES DEL PLANTEL EN M2', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
        { texto: 'SEÑALAMIENTOS DE EVACUACIÓN', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'EDIFICIOS Y/O NIVELES', medida: 91, color: 'gris' },
        { texto: 'BOTIQUÍN', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'SÓTANO', medida: 81, color: 'blanco' },
        { texto: 'x', medida: 10, color: 'blanco' },
        { texto: 'ESCALERA DE EMERGENCIAS', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'PLANTA BAJA', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
        { texto: 'ÁREA DE SEGURIDAD', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'PRIMER PISO', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
        { texto: 'EXTINTORES', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'SEGUNDO PISO', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
        { texto: 'PUNTO DE REUNIÓN PARA EVACUAR', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        { texto: 'TERCER PISO', medida: 81, color: 'blanco' },
        { texto: '', medida: 10, color: 'blanco' },
      ],
      repetirVeces: 1,
    },
  ];

  tablaDescripcionPlantel.forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });

  // const tablaHigiene = [
  //   { tipo: 'titulo', contenido: '4. HIGIENE DEL PLANTEL' },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: 'CONCEPTO', medida: 91, color: 'gris' },
  //       { texto: 'DESCRIPCIÓN', medida: 91, color: 'gris' },
  //     ],
  //     repetirVeces: 1,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: 'Sanitarios', medida: 91, color: 'blanco' },
  //       { texto: '', medida: 91, color: 'blanco' },
  //     ],
  //     altura: 40,
  //     repetirVeces: 1,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: '', medida: 91, color: 'blanco' },
  //       { texto: '', medida: 91, color: 'blanco' },
  //     ],
  //     repetirVeces: 6,
  //   },
  // ];

  // doc.addPage();
  // currentPositionY = 55;
  // tablaHigiene.forEach((item) => {
  //   // eslint-disable-next-line no-use-before-define
  //   switchTablas(item, doc, tituloTabla);
  // });

  // const tablaInfraestructuraPrograma = [
  //   { tipo: 'titulo', contenido: '5. INFRAESTRUCTURA PARA EL PROGRAMA' },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: 'ESPACIOS Y EQUIPAMIENTOS', medida: 182, color: 'gris' },
  //     ],
  //     repetirVeces: 1,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: 'INSTALACIONES', medida: 30.33, color: 'gris' },
  //       { texto: 'CAPACIDAD PROMEDIO (No. DE ALUMNOS)', medida: 30.33, color: 'gris' },
  //       { texto: 'METROS', medida: 30.33, color: 'gris' },
  //       { texto: 'RECURSOS MATERIALES', medida: 30.33, color: 'gris' },
  //       { texto: 'UBICACIÓN', medida: 30.33, color: 'gris' },
  //       { texto: 'ASIGNATURAS QUE ATIENDE', medida: 30.33, color: 'gris' },
  //     ],
  //     repetirVeces: 1,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: 'Aulas', medida: 182, color: 'gris' },
  //     ],
  //     repetirVeces: 1,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //     ],
  //     repetirVeces: 6,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: 'LABORATORIOS Y TALLERES', medida: 182, color: 'gris' },
  //     ],
  //     repetirVeces: 1,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //     ],
  //     repetirVeces: 4,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: 'LABORATORIO DE CÓMPUTO', medida: 182, color: 'gris' },
  //     ],
  //     repetirVeces: 1,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //     ],
  //     repetirVeces: 2,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: 'BIBLIOTECA FÍSICA Y VIRTUAL', medida: 182, color: 'gris' },
  //     ],
  //     repetirVeces: 1,
  //   },
  //   {
  //     tipo: 'fila',
  //     contenido: [
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //       { texto: '', medida: 30.33, color: 'blanco' },
  //     ],
  //     repetirVeces: 2,
  //   },
  // ];

  // doc.addPage();
  // currentPositionY = 55;

  // tablaInfraestructuraPrograma.forEach((item) => {
  //   // eslint-disable-next-line no-use-before-define
  //   switchTablas(item, doc, tituloTabla);
  // });
  // currentPositionY += 10;
  // currentPositionY += crearSeccion(
  //   currentPositionY,
  //   doc,
  //   'BAJO PROTESTA DE DECIR VERDAD',
  //   'center',
  // );
  // currentPositionY -= 200;
  // currentPositionY += crearSeccion(
  //   currentPositionY,
  //   doc,
  //   `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`,
  //   'center',
  // );

  agregarImagenYPaginaPie(doc, img3);
  doc.internal.events.subscribe('addPage', () => {
    addHeaderContent(doc);
  });
  const pdfDataUri = doc.output('arraybuffer');

  return pdfDataUri;
}

function crearTablaEspecifica(doc, item) {
  let xPosition = 14;
  const alturaCelda = item.altura || 7;
  item.contenido.forEach((cell) => {
    const anchoCelda = cell.medida || 111; // Default width if not provided
    const colorFondo = cell.color === 'blanco' ? [255, 255, 255] : [172, 178, 183]; // Determine fill color
    doc.setFillColor(...colorFondo); // Set the fill color
    // eslint-disable-next-line max-len, no-use-before-define
    crearCelda(doc, xPosition, currentPositionY, anchoCelda, alturaCelda, cell.texto, cell.bold, cell.tamano, cell.acomodoLetra); // Assuming default height of 7
    xPosition += anchoCelda;
  });

  currentPositionY += alturaCelda; // Assuming default height of 7
}

function switchTablas(item, doc, titulo) {
  switch (item.tipo) {
    case 'titulo':
      // eslint-disable-next-line max-len
      currentPositionY = generateTableAndSection(item.contenido, titulo, doc, currentPositionY);
      currentPositionY = updateCurrentPositionY(doc, 0);
      break;
    case 'fila':
      // eslint-disable-next-line no-case-declarations
      let i = 0;
      do {
        // eslint-disable-next-line no-use-before-define
        crearTablaEspecifica(doc, item);
        // eslint-disable-next-line no-plusplus
        i++;
      } while (i < item.repetirVeces);
      break;
    default:
      break;
  }
}

function crearCelda(doc, x, y, width, height, texto, bold = true, fontSize = 10, alignment = 'center') {
  doc.rect(x, y, width, height, 'F');
  doc.rect(x, y, width, height, 'S');

  if (bold) {
    doc.setFont('Nutmegb', 'bold');
  } else {
    doc.setFont('Nutmegb', 'normal');
  }

  doc.setFontSize(fontSize);

  let textoX = x; // Default to left-aligned
  if (alignment === 'center') {
    // eslint-disable-next-line max-len
    textoX = x + (width - (doc.getStringUnitWidth(texto) * fontSize) / doc.internal.scaleFactor) / 2; // Centered position
  }

  let setFillColor = [0, 0, 0];
  if (texto.includes('FDA') || texto.includes('FDP')) {
    setFillColor = [255, 255, 255];
  }

  doc.setTextColor(setFillColor[0], setFillColor[1], setFillColor[2]);
  doc.text(texto, textoX, y + 5); // Adjust Y position as needed
}

module.exports = { GenerarFDA04 };
