const { inspectoresProgramas } = require('./properties/inspectorPrograma');
const { responseProperties } = require('./properties/responseProperties');

const createInspectoresProgramasSchema = {
  tags: ['Inspecciones'],
  description: 'Create a new inspector program',
  body: {
    type: 'object',
    properties: {
      ...inspectoresProgramas,
    },
    required: ['inspectorId', 'programaId', 'inspeccionId'],
  },
  reponse: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
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
