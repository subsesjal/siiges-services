const HEADER_TABLA_ESTUDIANTIL = ['NIVEL DE ESTUDIO', 'TURNO', 'MODALIDAD', 'CICLO'];
const HEADER_NOMBRE_DATOS = ['Nombre', 'datos'];
const HEADER_GRADO_EDUCATIVO = ['GRADO EDUCATIVO', 'NOMBRE DE LOS ESTUDIOS'];
const HEADER_NOMBRE_PUESTO = [
  ['CON REFERENCIA GENERAL', '                                                             '],
  ['CON REFERENCIA AL PERFIL DE NUEVO INGRESO', '                                                             '],
  ['CON REFERENCIA AL PERFIL DE EGRESO', '                                                             '],
];
const HEADER_ROLES = [
  ['ALUMNO', '                                                             '],
  ['DOCENTE', '                                                             '],
  ['ADMINISTRATIVO', '                                                             '],
];
const HEADER_ENLACE = [
  ['URL/LIGA/LINK', '                                                             '],
  ['ALUMNO', '                                                             '],
  ['DOCENTE', '                                                             '],
  ['ADMINISTRATIVO', '                                                             '],
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
    fillColor: [255, 255, 255],
  },
  1: {
    fontStyle: 'bold',
  },
};

const tableModel = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '1. DESCRIPCIÓN DEL MODELO TEÓRICO-PEDAGÓGICO', medida: 182, color: 'gris' },
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
const tableInfrastructure = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '2. DESCRIPCIÓN DE LA INFRAESTRUCTURA TECNOLÓGICA DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA.', medida: 182, color: 'gris' },
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
const tableHeadersUsuarios = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '3. ROLES DE USUARIOS DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA.', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'ALUMNO', medida: 45, color: 'blanco' },
      { texto: '', medida: 137, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'DOCENTE', medida: 45, color: 'blanco' },
      { texto: '', medida: 137, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'ADMINISTRATIVO', medida: 45, color: 'blanco' },
      { texto: '', medida: 137, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];

const tableHeadersVinculos = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '4. ENLACE O VÍNCULO DE ACCESO PARA LA PLATAFORMA TECNOLÓGICA EDUCATIVA', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'URL/LIGA/LINK', medida: 45, color: 'blanco' },
      { texto: '', medida: 137, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'ALUMNO', medida: 45, color: 'blanco' },
      { texto: '', medida: 137, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'DOCENTE', medida: 45, color: 'blanco' },
      { texto: '', medida: 137, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'ADMINISTRATIVO', medida: 45, color: 'blanco' },
      { texto: '', medida: 137, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];

const tableLinkType = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '5. TIPO DE ENLACE DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA.', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '', medida: 80, color: 'blanco' },
      { texto: 'ENLACE DEDICADO', medida: 24, color: 'blanco' },
      { texto: 'ADSL', medida: 20, color: 'blanco' },
      { texto: 'FIBRA ÓPTICA', medida: 20, color: 'blanco' },
      { texto: 'OTRO (ESPECIFIQUE)', medida: 38, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      {
        texto: 'TIPO DE ENLACE DE LA PLATAFORMA \n TECNOLÓGICA EDUCATIVA \n LA PLATAFORMA \n TECNOLÓGICA \n EDUCATIVA', medida: 80, color: 'blanco', acomodoLetra: 'left',
      },
      { texto: '', medida: 24, color: 'blanco' },
      { texto: '', medida: 20, color: 'blanco' },
      { texto: '', medida: 20, color: 'blanco' },
      { texto: '', medida: 38, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const tableWidthBand = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '6. ANCHO DE BANDA DISPONIBLE PARA EL USO DE LA PLATAFORMA TECNOLÓGICA EDUCATIVA.', medida: 182, color: 'gris' },
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
const tableHeaderAdministration = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '7. ADMINISTRACIÓN Y PLANES DE CRECIMIENTO.', medida: 182, color: 'gris' },
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
const tableheaderCharacteristics = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '8. CARACTERÍSTICAS DEL HARDWARE, LAS DEL CÓMPUTO CENTRAL Y DISTRIBUIDO, ASÍ COMO LA BASE DE DATOS.', medida: 182, color: 'gris' },
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
const tableSoftwareCharacteristics = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '9. CARACTERÍSTICAS DEL SOFTWARE, LAS DEL CÓMPUTO CENTRAL Y DISTRIBUIDO, ASÍ COMO LA BASE DE DATOS.', medida: 182, color: 'gris' },
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
const tableSupport = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '10. SOPORTE TÉCNICO.', medida: 182, color: 'gris' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'RESOLUCIÓN DE PROBLEMAS BÁSICOS', medida: 61, color: 'blanco' },
      { texto: 'RESOLUCIÓN DE PROBLEMAS POR PERSONAL ESPECIALIZADO', medida: 61, color: 'blanco' },
      { texto: 'RESOLUCIÓN DE PROBLEMAS A NIVEL DE EXPERTO', medida: 60, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '', medida: 61, color: 'blanco' },
      { texto: '', medida: 61, color: 'blanco' },
      { texto: '', medida: 60, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const tableSecurity = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '11. SEGURIDAD DE LA INFORMACIÓN.', medida: 182, color: 'gris' },
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
const tableAdvantages = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '12. VENTAJAS.', medida: 182, color: 'gris' },
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
const tablePlan = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '13. PLAN DE CONTINGENCIAS.', medida: 182, color: 'gris' },
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
const tablePermissions = [
  {
    tipo: 'fila',
    contenido: [
      { texto: '14. PERMISOS, LICENCIAS E INSTRUMENTOS.', medida: 182, color: 'gris' },
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
  HEADER_ROLES,
  HEADER_ENLACE,
  tableModel,
  tableInfrastructure,
  tableHeadersUsuarios,
  tableHeadersVinculos,
  tableLinkType,
  tableWidthBand,
  tableHeaderAdministration,
  tableheaderCharacteristics,
  tableSoftwareCharacteristics,
  tableSupport,
  tableSecurity,
  tableAdvantages,
  tablePlan,
  tablePermissions,
};
