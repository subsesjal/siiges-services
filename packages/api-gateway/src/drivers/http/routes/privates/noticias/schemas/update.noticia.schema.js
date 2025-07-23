const { noticia } = require('./properties/noticia');
const { responseProperties } = require('./properties/responseProperties');

const updateNoticiaSchema = {
  tags: ['Noticia'],
  description: 'Given an object with noticia required data and noticiaId, then update noticia in database.',
  params: {
    type: 'object',
    properties: {
      noticiaId: { type: 'integer' },
    },
    required: ['noticiaId'],
  },
  body: {
    type: 'object',
    properties: {
      ...noticia,
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
            usuarioId: { type: 'integer' },
            ...noticia,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { updateNoticiaSchema };
