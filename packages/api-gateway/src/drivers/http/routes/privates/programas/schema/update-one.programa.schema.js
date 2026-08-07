const { programa } = require('./properties/programa');

const updateProgramaSchema = {
  tags: ['Programas'],
  description: 'Update permisoAlumno for a single Programa.',
  params: {
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
    },
    required: ['programaId'],
  },
  body: {
    type: 'object',
    properties: {
      permisoAlumno: { type: 'boolean' },
    },
    required: ['permisoAlumno'],
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: programa,
        },
      },
    },
  },
};

module.exports = { updateProgramaSchema };
