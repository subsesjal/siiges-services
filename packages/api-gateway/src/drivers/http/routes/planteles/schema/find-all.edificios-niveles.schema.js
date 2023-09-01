const { edificioNivel } = require('./properties/edificioNivel');
const { responseProperties } = require('./properties/responseProperties');

const findAllEdificiosNivelesSchema = {
  tags: ['Plantel'],
  description: 'Return the list of edificios niveles.',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...edificioNivel,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllEdificiosNivelesSchema;
