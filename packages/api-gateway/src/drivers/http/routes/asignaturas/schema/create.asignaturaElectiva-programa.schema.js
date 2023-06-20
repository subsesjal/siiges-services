const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const createAsignaturaElectivaSchema = {
  tags: ['Asignaturas Electivas'],
  description:
    'Given an object with asignatura required data, then save the first time a new asignatura electiva in database.',
  body: {
    type: 'object',
    properties: {
      ...asignatura,
    },
    required: ['programaId', 'nombre', 'clave', 'tipo'],
  },
  response: {
    201: {
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

module.exports = createAsignaturaElectivaSchema;
