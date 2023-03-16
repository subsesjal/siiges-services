const { docente } = require('./properties/docente');
const { responseProperties } = require('./properties/responseProperties');

const findOneDocenteSchema = {
  tags: ['Docentes'],
  description: 'Given a docente id, then return a docente from database.',
  params: {
    type: 'object',
    properties: { docenteId: { type: 'integer' } },
    required: ['docenteId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...docente,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = findOneDocenteSchema;
