const HEADER_TABLA_ESTUDIANTIL = ['NIVEL DE ESTUDIO', 'TURNO', 'MODALIDAD', 'CICLO'];
const HEADER_NOMBRE_DATOS = ['Nombre', 'datos'];
const HEADER_GRADO_EDUCATIVO = ['GRADO EDUCATIVO', 'NOMBRE DE LOS ESTUDIOS'];
const HEADER_NOMBRE_PUESTO = [
  ['NOMBRE PROPUESTO No. 1', '                                                             '],
  ['NOMBRE PROPUESTO No. 2', '                                                             '],
  ['NOMBRE PROPUESTO No. 3', '                                                             '],
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
  ['APELLIDO PATERNO', representante.apellidoPaterno],
  ['APELLIDO MATERNO', representante.apellidoMaterno],
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
  'DURACIÓN DEL PROGRAMA',
  'NOMBRE COMPLETO DE LA RAZÓN SOCIAL',
];

const columnStyles = {
  0: {
    fillColor: [172, 178, 183],
  },
  1: {
    fontStyle: 'bold',
  },
};

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
};
