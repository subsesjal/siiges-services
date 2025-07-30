const { cicloEscolar } = require('./properties/cicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const createCicloEscolar = {
  tags: ['Ciclo Escolar'],
  description: 'Crea un nuevo Ciclo Escolar asociado a un Programa Educativo específico.',
  querystring: {
    type: 'object',
    properties: { rvoe: { type: 'string' } },
    required: ['rvoe'],
  },
  body: {
    type: 'object',
    properties: { ...cicloEscolar },
    required: ['nombre', 'descripcion'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...cicloEscolar,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createCicloEscolar };
