const { diligencia } = require('./properties/diligencia');
const { responseProperties } = require('./properties/responseProperties');
const { persona } = require('../../usuarios/schema/properties/persona');

const createDiligencias = {
  tags: ['Diligencia'],
  description: 'Given an object with request data create a diligencia',
  body: {
    title: 'createDiligencia',
    type: 'object',
    properties: {
      ...diligencia,
      persona: {
        type: 'object',
        properties: {
          ...persona,
        },
        required: ['nombre', 'apellidoPaterno'],
      },
    },
    required: ['solicitudId', 'horaInicio', 'horaFin', 'persona'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...diligencia,
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

module.exports = createDiligencias;
