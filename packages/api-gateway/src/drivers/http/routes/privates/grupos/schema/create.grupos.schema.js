const { responseProperties } = require('./properties/responseProperties');
const { grupo } = require('./properties/grupo');

const createGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Create a grupo.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...grupo,
    },
    required: ['cicloEscolarId', 'turnoId', 'gradoId', 'descripcion', 'generacion', 'generacionFechaInicio'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...grupo,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createGrupoSchema };
