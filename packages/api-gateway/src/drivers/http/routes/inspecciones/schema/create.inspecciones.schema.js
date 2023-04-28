const { inspecciones } = require('./properties/inspecciones');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionesSchema = {
  tags: ['Inspecciones'],
  description: 'Given an object with inspecciones required data, then save a record of inspecciones in database.',
  body: {
    type: 'object',
    properties: {
      ...inspecciones,
    },
    required: ['programaId', 'estatusInspeccionId', 'fecha', 'fechaAsignada', 'resultado', 'folio'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...inspecciones,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionesSchema;
