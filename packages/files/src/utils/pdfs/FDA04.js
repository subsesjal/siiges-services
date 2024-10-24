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

function crearCelda(doc, x, y, width, height, text, bold = true, fontSize = 10, alignment = 'center') {
  doc.rect(x, y, width, height, 'F');
  doc.rect(x, y, width, height, 'S');

  if (bold) {
    doc.setFont('Nutmegb', 'bold');
  } else {
    doc.setFont('Nutmegb', 'normal');
  }

  doc.setFontSize(fontSize);

  let textoX = x;
  if (alignment === 'center') {
    textoX = x + (width - (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor) / 2;
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

function addHeaderContent(doc) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDA04');
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
    switchTablas(item, doc, tituloTabla);
  });

  currentPositionY = updateCurrentPositionY(doc, 40);

  tablaDomicilio(solicitud).forEach((item) => {
    switchTablas(item, doc, tituloTabla);
  });
  const tablaDescrPlantel = [
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
          texto: 'RECUBRIMIENTOS PLÁSTICOS EN PISOS Y ESCALONES',
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
    const descr = seguridad && seguridad.seguridadSistema && seguridad.seguridadSistema.descripcion
      ? seguridad.seguridadSistema.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      : '';

    const index = tablaDescrPlantel.findIndex((item) => {
      let texto = '';
      if (item.contenido && item.contenido[2] && item.contenido[2].texto) {
        texto = item.contenido[2].texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      }

      if (descr === 'botiquin') {
        texto = item.contenido && item.contenido[1] && item.contenido[1].texto
          ? item.contenido[1].texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
          : '';
      }
      const regex = new RegExp(`\\b${descr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+')}\\b`, 'i');
      return regex.test(texto);
    });

    if (index !== -1) {
      if (descr === 'botiquin') {
        if (tablaDescrPlantel[index].contenido && tablaDescrPlantel[index].contenido[2]) {
          tablaDescrPlantel[index].contenido[2].texto = 'x';
        }
      } if (tablaDescrPlantel[index].contenido && tablaDescrPlantel[index].contenido[3]) {
        tablaDescrPlantel[index].contenido[3].texto = 'x';
      }
    }
  });
  solicitud.programa.plantel.plantelEdificioNiveles.forEach((nivel) => {
    const descripcion = nivel && nivel.edificioNivel && nivel.edificioNivel.descripcion
      ? nivel.edificioNivel.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      : '';
    const index = tablaDescrPlantel.findIndex((item) => {
      const texto = item.contenido && item.contenido[0] && item.contenido[0].texto
        ? item.contenido[0].texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
        : '';
      return texto === descripcion;
    });
    if (index !== -1) {
      if (tablaDescrPlantel[index].contenido && tablaDescrPlantel[index].contenido[1]) {
        tablaDescrPlantel[index].contenido[1].texto = 'x';
      }
    }
  });

  tablaDescrPlantel.forEach((item) => {
    switchTablas(item, doc, tituloTabla);
  });
  let descripcionesHigiene = '';
  solicitud.programa.plantel.plantelHigienes.forEach((higiene, index) => {
    descripcionesHigiene += `${higiene && higiene.descripcion ? higiene.descripcion : ''}`;
    if (index < solicitud.programa.plantel.plantelHigienes.length - 1) {
      descripcionesHigiene += '\n';
    }
  });

  tablaHigiene[2].contenido[1].texto = descripcionesHigiene || '';
  tablaHigiene[3].contenido[1].texto = solicitud.programa.plantel.plantelHigienes[2] && solicitud.programa.plantel.plantelHigienes[2].higiene ? solicitud.programa.plantel.plantelHigienes[2].higiene.descripcion || '' : '';
  tablaHigiene[4].contenido[1].texto = solicitud.programa.plantel.plantelHigienes[3] && solicitud.programa.plantel.plantelHigienes[3].higiene ? solicitud.programa.plantel.plantelHigienes[3].higiene.descripcion || '' : '';
  tablaHigiene[5].contenido[1].texto = solicitud.programa.plantel.plantelHigienes[4] && solicitud.programa.plantel.plantelHigienes[4].higiene ? solicitud.programa.plantel.plantelHigienes[4].higiene.descripcion || '' : '';

  doc.addPage();
  currentPositionY = 55;
  tablaHigiene.forEach((item) => {
    switchTablas(item, doc, tituloTabla);
  });
  let asignaturasGrupo1 = [];
  let asignaturasGrupo2 = [];
  solicitud.programa.plantel.infraestructuras.forEach((obj) => {
    const asignaturas = obj && obj.asignaturasInfraestructura
      ? obj.asignaturasInfraestructura.map((item) => (item && item.asignatura ? item.asignatura.nombre : ''))
      : [];
    if (obj && obj.id) {
      if (obj.id === 1) {
        asignaturasGrupo1 = asignaturasGrupo1.concat(asignaturas);
      } else if (obj.id === 2) {
        asignaturasGrupo2 = asignaturasGrupo2.concat(asignaturas);
      }
    }
  });
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
    switchTablas(item, doc, tituloTabla);
  });

  currentPositionY += 10;

  tablaRelacionInstituciones(solicitud).forEach((item) => {
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

module.exports = { GenerarFDA04 };
