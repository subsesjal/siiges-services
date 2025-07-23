const { noticia } = require('./properties/noticia');
const { responseProperties } = require('./properties/responseProperties');

const createNoticiaSchema = {
  tags: ['Noticia'],
  description: 'Given an object with noticia required data, then save a noticia in database.',
  body: {
    type: 'object',
    properties: {
      ...noticia,
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
            ...noticia,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createNoticiaSchema };
