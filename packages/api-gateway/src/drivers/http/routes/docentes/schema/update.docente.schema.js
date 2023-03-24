const { docente } = require('./properties/docente');
const { responseProperties } = require('./properties/responseProperties');
const { persona } = require('../../usuarios/schema/properties/persona');

const updateDocenteSchema = {
  tags: ['docente'],
  description: 'docente',
  params: {
    type: 'object',
    properties: {
      docenteId: { type: 'integer' },
    },
    required: ['docenteId'],
  },
  body: {
    type: 'object',
    properties: {
      ...docente,
      persona: {
        type: 'object',
        properties: {
          ...persona,
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...docente,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = updateDocenteSchema;
