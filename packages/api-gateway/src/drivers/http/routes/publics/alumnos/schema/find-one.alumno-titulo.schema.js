const { tituloElectronico } = require('./properties/tituloElectronico');
const { responseProperties } = require('../../../external/alumnos/schema/properties/responseProperties');

const findAlumnoTitulo = {
  tags: ['Alumnos'],
  description: 'Dado un folio del titulo de un Alumno, muestro los datos de un titulo electronico digital.',
  querystring: {
    type: 'object',
    properties: { folioControl: { type: 'string' } },
    required: ['folioControl'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        ...tituloElectronico,
        ...responseProperties,
      },
    },
  },
};

module.exports = { findAlumnoTitulo };
