const { inspectoresProgramas } = require('./properties/inspectoresProgramas');
const { responseProperties } = require('./properties/responseProperties');

const findAllInspectoresProgramasSchema = {
  tags: ['Inspecciones'],
  description: 'Find all inspector programs',
  reponse: {
    200: {
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

module.exports = findAllInspectoresProgramasSchema;
