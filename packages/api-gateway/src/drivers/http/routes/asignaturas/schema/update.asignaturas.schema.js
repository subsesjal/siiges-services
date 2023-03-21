const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

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
      ...asignatura,
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
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateAsignaturas;
