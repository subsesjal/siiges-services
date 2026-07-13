const { programa } = require('./properties/programa');
const { asignatura } = require('./properties/asignatura');

const findOneProgramaRvoeSchema = {
  tags: ['Programas'],
  description: 'Return an object programa by RVOE.',
  querystring: {
    type: 'object',
    required: ['rvoe'],
    properties: {
      rvoe: {
        type: 'string',
        description: 'RVOE del programa',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: ['object', 'null'],
          properties: {
            id: { type: 'integer' },
            ...programa,
            grados: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  gradoId: { type: 'integer' },
                  nombre: { type: 'string' },
                  asignaturas: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...asignatura,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findOneProgramaRvoeSchema;
