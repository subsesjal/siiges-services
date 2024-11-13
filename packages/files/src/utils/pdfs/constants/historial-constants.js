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

function getFullName(persona) {
  const { nombre, apellidoPaterno, apellidoMaterno } = persona.dataValues;
  return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
}
const promedioTable = (promedio, totalCreditos, creditos) => [
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'CRÉDITOS OBTENIDOS', medida: 60.66, color: 'gris', bold: true,
      },
      {
        texto: 'PROMEDIO', medida: 60.66, color: 'gris', bold: true,
      },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: `${totalCreditos} de ${creditos}`, medida: 60.66, color: 'blanco' },
      { texto: `${promedio}`, medida: 60.66, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const institutionTable = (firstTableData) => [
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'Nombre de la Institución', medida: 80.66, color: 'gris', bold: true,
      },
      { texto: firstTableData.nombreInstitucion, medida: 101, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'CLAVE DE CENTRO DE TRABAJO', medida: 80.66, color: 'gris', bold: true,
      },
      { texto: firstTableData.claveCentroTrabajo, medida: 101, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'NÚMERO DE ACUERDO', medida: 80.66, color: 'gris', bold: true,
      },
      { texto: firstTableData.acuerdo, medida: 101, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'NIVEL Y NOMBRE DEL PLAN DE ESTUDIOS', medida: 80.66, color: 'gris', bold: true,
      },
      { texto: firstTableData.nivelNombre, medida: 101, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const studentDataTable = (studentData, statusStudent) => [
  { tipo: 'titulo', contenido: 'Datos del alumno' },
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'MATRÍCULA', medida: 60.66, color: 'gris', bold: true,
      },
      {
        texto: 'NOMBRE DEL ALUMNO', medida: 60.66, color: 'gris', bold: true,
      },
      {
        texto: 'ESTATUS', medida: 60.66, color: 'gris', bold: true,
      },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: studentData.matricula, medida: 60.66, color: 'blanco' },
      { texto: getFullName(studentData.persona), medida: 60.66, color: 'blanco' },
      { texto: statusStudent, medida: 60.66, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];

const scholarCicleTable = (cicleData) => {
  const table = [
    { tipo: 'titulo', contenido: cicleData.nombreCicloEscolar, tamano: 15 },
    {
      tipo: 'fila',
      contenido: [
        {
          texto: 'CLAVE', medida: 17, color: 'gris', bold: true,
        },
        {
          texto: 'SERIACIÓN', medida: 23, color: 'gris', bold: true,
        },
        {
          texto: 'UNIDAD DE APRENDIZAJE', medida: 66, color: 'gris', bold: true,
        },
        {
          texto: 'TIPO', medida: 20, color: 'gris', bold: true,
        },
        {
          texto: 'CALI.', medida: 10, color: 'gris', tamano: 7, bold: true,
        },
        {
          texto: 'CRED.', medida: 10, color: 'gris', tamano: 7, bold: true,
        },
        {
          texto: 'FECHA DE ACREDITACIÓN.', medida: 36, color: 'gris', tamano: 7, bold: true,
        },
      ],
      repetirVeces: 1,
    },
  ];
  cicleData.asignatura.forEach((asignatura, index) => {
    const calificacion = cicleData.calificaciones[index] || {};
    table.push({
      tipo: 'fila',
      contenido: [
        { texto: asignatura.clave || '', medida: 17, color: 'blanco' },
        { texto: asignatura.seriacion || '', medida: 23, color: 'blanco' },
        { texto: asignatura.nombre || '', medida: 66, color: 'blanco' },
        { texto: calificacion.tipo === 1 ? 'Ordinario' : 'Extraordinario', medida: 20, color: 'blanco' },
        { texto: calificacion.calificacion || '', medida: 10, color: 'blanco' },
        { texto: asignatura.creditos || '', medida: 10, color: 'blanco' },
        { texto: calificacion.fechaExamen || '', medida: 36, color: 'blanco' },
      ],
      repetirVeces: 1,
    });
  });

  return table;
};

module.exports = {
  promedioTable,
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
  studentDataTable,
  scholarCicleTable,
  institutionTable,
};
