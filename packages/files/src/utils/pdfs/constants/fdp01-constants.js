const HEADER_TABLA_ESTUDIANTIL = ['NIVEL DE ESTUDIO', 'TURNO', 'MODALIDAD', 'CICLO'];
const HEADER_NOMBRE_DATOS = ['Nombre', 'datos'];
const HEADER_GRADO_EDUCATIVO = ['GRADO EDUCATIVO', 'NOMBRE DE LOS ESTUDIOS'];
const HEADER_NOMBRE_PUESTO = [
  ['CON REFERENCIA GENERAL', '                                                             '],
  ['CON REFERENCIA AL PERFIL DE NUEVO INGRESO', '                                                             '],
  ['CON REFERENCIA AL PERFIL DE EGRESO', '                                                             '],
];
const HEADER_IDEARIO = [
  ['MISIÓN', '                                                             '],
  ['VISIÓN', '                                                             '],
  ['VALORES', '                                                             '],
];
const HEADER_TABLA_DOMICILIO = ['CALLE Y NÚMERO', 'COLONIA'];
const HEADER_TABLA_CORREO = [
  'CORREO INSTITUCIONAL',
  'CORREO PERSONAL',
  'TELÉFONO CELULAR',
];
const HEADER_TABLA_DOMICILIO2 = [
  'CÓDIGO POSTAL',
  'DELEGACIÓN O MUNICIPIO',
  'ENTIDAD FEDERATIVA',
];
const HEADER_TABLA_REDES_SOCIALES = [
  'NÚMERO TELEFÓNICO',
  'REDES SOCIALES',
  'CORREO ELECTRÓNICO',
];
const TITLE_DOMICILIO = 'DOMICILIO DE LA INSTITUCIÓN';
const tituloRepresentante = 'DATOS DEL SOLICITANTE (PERSONA FÍSICA O REPRESENTANTE LEGAL DE LA PERSONA JURÍDICA';
const TABLA_REPRESENTANTE = (representante) => [
  ['NOMBRE (S)', representante.nombre],
  ['PRIMER APELLIDO', representante.apellidoPaterno],
  ['SEGUNDO APELLIDO', representante.apellidoMaterno],
  ['NACIONALIDAD', representante.nacionalidad],
];
const rowsDomicilio2 = (domicilio) => [
  [
    domicilio.codigoPostal,
    domicilio.municipio.nombre,
    domicilio.estado.nombre,
  ],
];
const rowsDomicilio = (domicilio) => [
  [
    `${domicilio.calle
    }  ${domicilio.numeroExterior}`,
    domicilio.colonia,
  ],
];

const diligenteBody = (diligente) => {
  const nombreDiligente = `${diligente.persona.nombre} ${diligente.persona.apellidoPaterno} ${diligente.persona.apellidoMaterno}`;
  return [
    ['NOMBRE COMPLETO', nombreDiligente],
    ['CARGO', ''],
    ['NÚMERO TELEFÓNICO', diligente.persona.celular || '4747466124, 3787900984'],
    ['CORREO ELECTRÓNICO', diligente.persona.correoPrimario || 'primer@gmail.com'],
    [
      'HORARIO DE ATENCIÓN',
      `${new Date(diligente.horaInicio).getHours()} horas a la(s) ${new Date(diligente.horaFin).getHours()} horas` || '9 A 14 Y DE 16 A 19 HORAS',
    ],
  ];
};

const HEADER_MAIN_TITTLE = [
  'NOMBRE DE LA INSTITUCIÓN',
  'NIVEL Y NOMBRE DEL PLAN DE ESTUDIOS',
  'MODALIDAD',
  'DURACIÓN DEL PROGRAMA',
];

const columnStyles = {
  0: {
    fillColor: [172, 178, 183],
  },
  1: {
    fontStyle: 'bold',
  },
};
const tableInstitution = (solicitud, nombreNivel) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: 'NOMBRE DE LA INSTITUCIÓN', medida: 91, color: 'gris' },
      { texto: solicitud?.programa?.plantel?.institucion?.nombre, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'NIVEL Y NOMBRE DEL PLAN DE ESTUDIOS', medida: 91, color: 'gris' },
      { texto: `${nombreNivel} en ${solicitud?.programa?.nombre}`, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'DURACIÓN DEL PROGRAMA', medida: 91, color: 'gris' },
      { texto: solicitud?.programa?.duracionPeriodos, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'NOMBRE COMPLETO DE LA RAZÓN SOCIAL', medida: 91, color: 'gris' },
      { texto: solicitud?.programa?.plantel?.institucion?.razonSocial, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const tableStudy = () => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '1. ESTUDIO DE PERTINENCIA Y FACTIBILIDAD', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'CON REFERENCIA GENERAL', medida: 91, color: 'gris' },
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'CON REFERENCIA AL PERFIL DE NUEVO INGRESO', medida: 91, color: 'gris' },
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'CON REFERENCIA AL PERFIL DE EGRESO', medida: 91, color: 'gris' },
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const tableSupplyDemandStudy = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '2. ESTUDIO DE OFERTA Y DEMANDA', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '', medida: 182, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const tableSourcesInformation = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '3. FUENTES DE INFORMACIÓN', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '', medida: 182, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const tableModelEducation = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '4. MODELO EDUCATIVO', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '', medida: 182, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const tablePolitics = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '5. POLÍTICAS DE FUNCIONAMIENTO', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '', medida: 182, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const tableIdeasInstitutional = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '6. IDEARIO INSTITUCIONAL', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'MISIÓN', medida: 40, color: 'blanco' },
      { texto: '', medida: 142, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'VISIÓN', medida: 40, color: 'blanco' },
      { texto: '', medida: 142, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'VALORES', medida: 40, color: 'blanco' },
      { texto: '', medida: 142, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
module.exports = {
  HEADER_MAIN_TITTLE,
  columnStyles,
  diligenteBody,
  HEADER_TABLA_ESTUDIANTIL,
  HEADER_TABLA_DOMICILIO,
  HEADER_TABLA_DOMICILIO2,
  TITLE_DOMICILIO,
  HEADER_TABLA_REDES_SOCIALES,
  HEADER_NOMBRE_DATOS,
  TABLA_REPRESENTANTE,
  tituloRepresentante,
  rowsDomicilio,
  rowsDomicilio2,
  HEADER_TABLA_CORREO,
  HEADER_NOMBRE_PUESTO,
  HEADER_GRADO_EDUCATIVO,
  HEADER_IDEARIO,
  tableInstitution,
  tableStudy,
  tableSupplyDemandStudy,
  tableSourcesInformation,
  tableModelEducation,
  tablePolitics,
  tableIdeasInstitutional,
};
