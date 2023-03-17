const { asignaturas } = require('./properties/asignatura');
const { asignaturasResponse } = require('./properties/responseProperties');

const updateAsignaturas = {
  tags: ['Asignaturas'],
  description: 'Given a AsignaturasId update a asignaturas',
  params: {
    title: 'update asignaturas',
    type: 'object',
    properties: {
      AsignaturasId: { type: 'integer' },
    },
    required: ['asignaturasId'],
  },
  body: {
    title: 'getOneAsignatura',
    type: 'object',
    properties: {
      ...asignaturas,
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...asignaturasResponse,
          },
        },
      },
    },
  },
};

module.exports = updateAsignaturas;
