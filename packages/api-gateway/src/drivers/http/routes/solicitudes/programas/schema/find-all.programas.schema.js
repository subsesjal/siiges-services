const { programa } = require('./properties/programa');
const { responseProperties } = require('./properties/responseProperties');

const findAllProgramasSchema = {
  tags: ['Programas'],
  description: 'Return a list of programs.',
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
              ...programa,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllProgramasSchema;
