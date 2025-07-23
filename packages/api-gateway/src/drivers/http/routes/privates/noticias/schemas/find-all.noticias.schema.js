const { responseProperties } = require('./properties/responseProperties');
const { noticia } = require('./properties/noticia');

const findAllNoticiasSchema = {
  tags: ['Noticias'],
  description: 'Return a list of Noticias',
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
              ...noticia,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllNoticiasSchema };
