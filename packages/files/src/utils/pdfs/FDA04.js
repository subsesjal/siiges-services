/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

const {
  modalidades, ciclos,
} = require('./constants');
const {
  tablaDomicilio,
  tablaHigiene,
  tablaInfraestructuraPrograma,
  tablaRelacionInstituciones,
  tablaDatosPlan,
} = require('./constants/fda04-constants');

const {
  configurarFuenteYAgregarTexto,
  updateCurrentPositionY,
  generateTableAndSection,
  agregarImagenYPaginaPie,
  buscarDescripcionPorId,
  crearSeccion,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });
let currentPositionY = 0;

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
  currentPositionY = 60;
  const textoCiclos = ciclosTipo === 'Semestral' ? 'Semestres' : 'Cuatrimestres';
  tablaDatosPlan(solicitud, textoCiclos, modalidadTipo).forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });

  currentPositionY = updateCurrentPositionY(doc, 40);

  tablaDomicilio(solicitud).forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });
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
        {
          texto: 'CONSTRUIDO PARA LA ESCUELA',
          medida: 81,
          color: 'blanco',
        },
        {
          texto: solicitud.programa.plantel && solicitud.programa.plantel.tipoInmueble && solicitud.programa.plantel.tipoInmueble.nombre && solicitud.programa.plantel.tipoInmueble.nombre.includes('construido') ? 'x' : '',
          medida: 10,
          color: 'blanco',
        },
        {
          texto: 'Descripcion',
          medida: 81,
          color: 'blanco',
        },
        {
          texto: 'NO.',
          medida: 10,
          color: 'blanco',
        },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        {
          texto: 'ADAPTADO',
          medida: 81,
          color: 'blanco',
        },
        {
          texto: solicitud.programa.plantel && solicitud.programa.plantel.tipoInmueble && solicitud.programa.plantel.tipoInmueble.nombre && solicitud.programa.plantel.tipoInmueble.nombre.includes('adaptado') ? 'x' : '',
          medida: 10,
          color: 'blanco',
        },
        {
          texto: 'RECUBRIMIENTOS PLÁSTICOS EN PISOS Y ESCALONE',
          medida: 81,
          color: 'blanco',
          bold: true,
          tamano: 8.3,
        },
        {
          texto: '',
          medida: 10,
          color: 'blanco',
        },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        {
          texto: 'MIXTO',
          medida: 81,
          color: 'blanco',
        },
        {
          texto: solicitud.programa.plantel && solicitud.programa.plantel.tipoInmueble && solicitud.programa.plantel.tipoInmueble.nombre && solicitud.programa.plantel.tipoInmueble.nombre.includes('mixto') ? 'x' : '',
          medida: 10,
          color: 'blanco',
        },
        {
          texto: 'ALARMA CONTRA INCENDIOS Y/O TERREMOTOS',
          medida: 81,
          color: 'blanco',
          bold: true,
          tamano: 8.7,
        },
        {
          texto: '',
          medida: 10,
          color: 'blanco',
        },
      ],
      repetirVeces: 1,
    },
    {
      tipo: 'fila',
      contenido: [
        {
          texto: 'DIMENSIONES DEL PLANTEL EN M2',
          medida: 81,
          color: 'blanco',
        },
        {
          texto: solicitud.programa.plantel && solicitud.programa.plantel.dimensiones ? solicitud.programa.plantel.dimensiones : 'S/I',
          medida: 10,
          color: 'blanco',
        },
        {
          texto: 'SEÑALAMIENTOS DE EVACUACIÓN',
          medida: 81,
          color: 'blanco',
        },
        {
          texto: '',
          medida: 10,
          color: 'blanco',
        },
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
        { texto: '', medida: 10, color: 'blanco' },
        { texto: 'ESCALERAS DE EMERGENCIA', medida: 81, color: 'blanco' },
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
        { texto: 'PUNTOS DE REUNIÓN PARA EVACUACION', medida: 81, color: 'blanco' },
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

  currentPositionY = updateCurrentPositionY(doc, 47);
  solicitud.programa.plantel.plantelSeguridadSistemas.forEach((seguridad) => {
    // Verificar si seguridad y seguridad.seguridadSistema están definidos
    // eslint-disable-next-line max-len
    const descripcion = seguridad && seguridad.seguridadSistema && seguridad.seguridadSistema.descripcion
      ? seguridad.seguridadSistema.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      : '';

    const index = tablaDescripcionPlantel.findIndex((item) => {
      let texto = '';

      // Verificar la existencia de item.contenido y sus elementos antes de acceder
      if (item.contenido && item.contenido[2] && item.contenido[2].texto) {
        texto = item.contenido[2].texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      }

      if (descripcion === 'botiquin') {
        // Verificar la existencia de item.contenido[1] y su elemento antes de acceder
        texto = item.contenido && item.contenido[1] && item.contenido[1].texto
          ? item.contenido[1].texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
          : '';
      }

      // Uso de expresión regular para buscar coincidencias parciales
      const regex = new RegExp(`\\b${descripcion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+')}\\b`, 'i');
      return regex.test(texto);
    });

    if (index !== -1) {
      if (descripcion === 'botiquin') {
        // Verificar la existencia de item.contenido[2] antes de acceder
        // eslint-disable-next-line max-len
        if (tablaDescripcionPlantel[index].contenido && tablaDescripcionPlantel[index].contenido[2]) {
          tablaDescripcionPlantel[index].contenido[2].texto = 'x';
        }
      } else {
        // Verificar la existencia de item.contenido[3] antes de acceder
        // eslint-disable-next-line max-len, no-lonely-if
        if (tablaDescripcionPlantel[index].contenido && tablaDescripcionPlantel[index].contenido[3]) {
          tablaDescripcionPlantel[index].contenido[3].texto = 'x';
        }
      }
    }
  });

  // Iterate over plantelEdificioNiveles
  solicitud.programa.plantel.plantelEdificioNiveles.forEach((nivel) => {
    // Verificar si nivel y nivel.edificioNivel están definidos
    const descripcion = nivel && nivel.edificioNivel && nivel.edificioNivel.descripcion
      ? nivel.edificioNivel.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      : '';

    // Buscar el índice correspondiente en tablaDescripcionPlantel
    const index = tablaDescripcionPlantel.findIndex((item) => {
      // Verificar la existencia de item.contenido[0] y su propiedad texto
      const texto = item.contenido && item.contenido[0] && item.contenido[0].texto
        ? item.contenido[0].texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
        : '';
      return texto === descripcion;
    });

    // Si se encuentra el índice y es válido
    if (index !== -1) {
      // Verificar la existencia de tablaDescripcionPlantel[index].contenido[1] antes de acceder
      if (tablaDescripcionPlantel[index].contenido && tablaDescripcionPlantel[index].contenido[1]) {
        tablaDescripcionPlantel[index].contenido[1].texto = 'x';
      }
    }
  });

  tablaDescripcionPlantel.forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });
  // Inicializar una variable para almacenar todas las descripciones
  let descripcionesHigiene = '';

  // Recorrer plantelHigienes y concatenar las descripciones
  solicitud.programa.plantel.plantelHigienes.forEach((higiene, index) => {
    descripcionesHigiene += `${higiene && higiene.descripcion ? higiene.descripcion : ''}`;
    if (index < solicitud.programa.plantel.plantelHigienes.length - 1) {
      descripcionesHigiene += '\n'; // Agregar salto de línea excepto al final
    }
  });

  tablaHigiene[2].contenido[1].texto = descripcionesHigiene || '';
  tablaHigiene[3].contenido[1].texto = solicitud.programa.plantel.plantelHigienes[2] && solicitud.programa.plantel.plantelHigienes[2].higiene ? solicitud.programa.plantel.plantelHigienes[2].higiene.descripcion || '' : '';
  tablaHigiene[4].contenido[1].texto = solicitud.programa.plantel.plantelHigienes[3] && solicitud.programa.plantel.plantelHigienes[3].higiene ? solicitud.programa.plantel.plantelHigienes[3].higiene.descripcion || '' : '';
  tablaHigiene[5].contenido[1].texto = solicitud.programa.plantel.plantelHigienes[4] && solicitud.programa.plantel.plantelHigienes[4].higiene ? solicitud.programa.plantel.plantelHigienes[4].higiene.descripcion || '' : '';

  doc.addPage();
  currentPositionY = 55;
  tablaHigiene.forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });
  let asignaturasGrupo1 = [];
  let asignaturasGrupo2 = [];
  // Iterar sobre cada objeto en infraestructuras
  solicitud.programa.plantel.infraestructuras.forEach((obj) => {
    // Verificar si obj y obj.asignaturasInfraestructura están definidos
    const asignaturas = obj && obj.asignaturasInfraestructura
      ? obj.asignaturasInfraestructura.map((item) => (item && item.asignatura ? item.asignatura.nombre : ''))
      : [];

    // Aplicar criterios para asignar a diferentes variables
    if (obj && obj.id) {
      if (obj.id === 1) {
        asignaturasGrupo1 = asignaturasGrupo1.concat(asignaturas);
      } else if (obj.id === 2) {
        asignaturasGrupo2 = asignaturasGrupo2.concat(asignaturas);
      }
    }
  });

  // Convertir arrays en strings separados por coma
  const asignaturasGrupo1Str = asignaturasGrupo1.join(', ');
  const asignaturasGrupo2Str = asignaturasGrupo2.join(', ');
  const tabla = tablaInfraestructuraPrograma(solicitud);

  if (tabla[4] && tabla[4].contenido && tabla[4].contenido[5]) {
    tabla[4].contenido[5].texto = asignaturasGrupo1Str ?? '';
  }

  if (tabla[5] && tabla[5].contenido && tabla[5].contenido[5]) {
    tabla[5].contenido[5].texto = asignaturasGrupo2Str ?? '';
  }
  doc.addPage();
  currentPositionY = 55;

  tablaInfraestructuraPrograma(solicitud).forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });

  currentPositionY += 10;

  tablaRelacionInstituciones(solicitud).forEach((item) => {
    // eslint-disable-next-line no-use-before-define
    switchTablas(item, doc, tituloTabla);
  });
  currentPositionY += 10;
  crearSeccion(
    currentPositionY,
    doc,
    'BAJO PROTESTA DE DECIR VERDAD',
    'center',
  );
  currentPositionY += 5;
  crearSeccion(
    currentPositionY,
    doc,
    `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`,
    'center',
  );

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
