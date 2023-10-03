const { responseProperties } = require('./properties/responseProperties');
const { grupos } = require('./properties/grupos');
const { grado } = require('./properties/grados');

const createGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Create a grupo.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...grupos,
      ...grado,
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
            grado: {
              type: 'object',
              properties: {
                ...grado,
              },
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createGrupoSchema };
