const { inspeccion } = require('./properties/inspeccion');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionSchema = {
  tags: ['Inspecciones'],
  description: 'Given an object with inspeccion required data, then save a record of one inspeccion in database.',
  body: {
    type: 'object',
    properties: {
      ...inspeccion,
    },
    required: ['programaId', 'estatusInspeccionId', 'fechaAsignada'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...inspeccion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionSchema;
