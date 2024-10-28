const HEADER_TABLA_ESTUDIANTIL = ['NIVEL DE ESTUDIO', 'TURNO', 'MODALIDAD', 'CICLO'];
const HEADER_NOMBRE_DATOS = ['Nombre', 'datos'];
const HEADER_GRADO_EDUCATIVO = ['GRADO EDUCATIVO', 'NOMBRE DE LOS ESTUDIOS'];
const HEADER_NOMBRE_PUESTO = (nombres) => [
  ['NOMBRE PROPUESTO No. 1', nombres[0] || ''],
  ['NOMBRE PROPUESTO No. 2', nombres[1] || ''],
  ['NOMBRE PROPUESTO No. 3', nombres[2] || ''],
];
const HEADER_TABLA_ALUMNO = ['MATRÍCULA', 'NOMBRE DEL ALUMNO', 'ESTATUS'];
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
const TITLE_ALUMNO = 'DATOS DEL ALUMNO';
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
const rowsAlumno = (alumno) => [
  [
    alumno.matricula,
    `${alumno.apellidoPaterno
    }  ${alumno.apellidoMaterno
    } ${alumno.nombre}`,
    alumno.estatus,
  ],
];

const diligenteBody = (diligente) => {
  const nombreDiligente = `${diligente.persona.nombre} ${diligente.persona.apellidoPaterno} ${diligente.persona.apellidoMaterno}`;
  return [
    ['NOMBRE COMPLETO', nombreDiligente],
    ['CARGO', diligente.persona.tituloCargo],
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
  'CLAVE DE CENTRO DE TRABAJO',
  'NÚMERO DE ACUERDO',
  'NIVEL Y NOMBRE DEL PLAN DE ESTUDIOS',
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
  HEADER_TABLA_ALUMNO,
  HEADER_TABLA_DOMICILIO2,
  TITLE_ALUMNO,
  HEADER_TABLA_REDES_SOCIALES,
  HEADER_NOMBRE_DATOS,
  TABLA_REPRESENTANTE,
  tituloRepresentante,
  rowsAlumno,
  rowsDomicilio2,
  HEADER_TABLA_CORREO,
  HEADER_NOMBRE_PUESTO,
  HEADER_GRADO_EDUCATIVO,
};
