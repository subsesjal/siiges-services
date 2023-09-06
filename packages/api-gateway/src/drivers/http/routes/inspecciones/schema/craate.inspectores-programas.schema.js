const { inspectoresProgramas } = require('./properties/inspectoresProgramas');
const { responseProperties } = require('./properties/responseProperties');

const createInspectoresProgramasSchema = {
  tags: ['Inspecciones'],
  description: 'Create a new inspector program',
  body: {
    type: 'object',
    properties: {
      ...inspectoresProgramas,
    },
    required: ['inspectorId', 'programaId'],
  },
  reponse: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          properties: {
            id: { type: 'integer' },
            ...inspectoresProgramas,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspectoresProgramasSchema;
