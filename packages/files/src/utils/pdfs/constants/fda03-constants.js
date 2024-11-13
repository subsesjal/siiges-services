const HEADER_NOMBRE_DATOS = ['Nombre', 'datos'];
const HEADER_TITULOS_NOMBRES = ['Titulo1', 'Titulo2', 'Contenido'];
const PROPUESTAS_NOMBRE = (nombresPropuestos) => [
  ['1', nombresPropuestos.nombrePropuesto1],
  ['2', nombresPropuestos.nombrePropuesto2],
  ['3', nombresPropuestos.nombrePropuesto3],
];
const HEADER_DATOS_AUTORIZACION = (autorizados) => [
  ['1', 'NOMBRE AUTORIZADO', autorizados.nombreAutorizado],
  ['2', 'RVOE    ', ''],
  ['3', 'FECHA DE AUTORIZACIÓN DE NOMBRE', autorizados.fechaAutorizacion],
];

const TABLA_REPRESENTANTE = (representante) => [
  ['NOMBRE (S)', representante.nombre],
  ['PRIMER APELLIDO', representante.apellidoPaterno],
  ['SEGUNDO APELLIDO', representante.apellidoMaterno],
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
  TABLA_REPRESENTANTE,
  PROPUESTAS_NOMBRE,
  HEADER_DATOS_AUTORIZACION,
};
