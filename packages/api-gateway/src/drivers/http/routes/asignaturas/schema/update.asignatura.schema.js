const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const updateAsignatura = {
  tags: ['Asignaturas'],
  description: 'Given a AsignaturasId update a asignaturas',
  params: {
    title: 'update asignaturas',
    type: 'object',
    properties: {
      asignaturaId: { type: 'integer' },
    },
    required: ['asignaturaId'],
  },
  body: {
    title: 'getOneAsignatura',
    type: 'object',
    properties: {
      ...asignatura,
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
            ...asignatura,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateAsignatura;
