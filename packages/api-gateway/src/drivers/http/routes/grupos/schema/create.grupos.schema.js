const { responseProperties } = require('./properties/responseProperties');
const { grupos } = require('./properties/grupos');

const createGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Create a grupo.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...grupos,
    },
    required: ['cicloEscolarId', 'turnoId', 'generacion', 'generacionFechaInicio', 'generacionFechaFin'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...grupos,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createGrupoSchema };
