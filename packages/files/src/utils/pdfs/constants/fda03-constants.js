const HEADER_NOMBRE_DATOS = ['Nombre', 'datos'];
const HEADER_TITULOS_NOMBRES = ['Titulo1', 'Titulo2', 'Contenido'];

const tableAuthorizedData = (authorizedData) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '3. EN CASO DE TENER NOMBRE AUTORIZADO', medida: 182, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '1', medida: 91, color: 'naranja' },
      { texto: authorizedData?.nombreAutorizado, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '2', medida: 91, color: 'naranja' },
      { texto: '', medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '3', medida: 91, color: 'naranja' },
      {
        texto: authorizedData?.fechaAutorizacion
          ? new Date(authorizedData.fechaAutorizacion).toLocaleDateString('en-US')
          : 'N/A',
        medida: 91,
        color: 'blanco',
      },
    ],
    repetirVeces: 1,
  },
];
const tableProposedNames = (proposedNames) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '2. PROPUESTAS DE NOMBRE', medida: 182, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '1', medida: 91, color: 'naranja' },
      { texto: proposedNames?.nombrePropuesto1, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '2', medida: 91, color: 'naranja' },
      { texto: proposedNames?.nombrePropuesto2, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: '3', medida: 91, color: 'naranja' },
      { texto: proposedNames?.nombrePropuesto3, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];
const HEADER_DATOS_AUTORIZACION = (autorizados) => [
  ['1', 'NOMBRE AUTORIZADO', autorizados.nombreAutorizado],
  ['2', 'RVOE    ', ''],
  ['3', 'FECHA DE AUTORIZACIÓN DE NOMBRE', autorizados.fechaAutorizacion],
];
const tableRepresentativeLegal = (representative) => [
  {
    tipo: 'fila',
    contenido: [
      { texto: '1. DATOS DEL PROPIETARIO O REPRESENTANTE LEGAL', medida: 182, color: 'naranja' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'NOMBRE (S)', medida: 91, color: 'naranja' },
      { texto: representative?.nombre, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'APELLIDO PATERNO', medida: 91, color: 'naranja' },
      { texto: representative?.apellidoPaterno, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
  {
    tipo: 'fila',
    contenido: [
      { texto: 'APELLIDO MATERNO', medida: 91, color: 'naranja' },
      { texto: representative?.apellidoMaterno, medida: 91, color: 'blanco' },
    ],
    repetirVeces: 1,
  },
];

const columnStyles = {
  0: {
    fillColor: [172, 178, 183],
  },
  1: {
    fillColor: [172, 178, 183],
  },
};
const columnStylesFirstAndSecondTable = {
  0: {
    fillColor: [172, 178, 183],
  },
  1: {
    fillColor: [255, 255, 255],
  },
};
module.exports = {
  HEADER_NOMBRE_DATOS,
  columnStyles,
  HEADER_TITULOS_NOMBRES,
  columnStylesFirstAndSecondTable,
  HEADER_DATOS_AUTORIZACION,
  tableRepresentativeLegal,
  tableProposedNames,
  tableAuthorizedData,
};
