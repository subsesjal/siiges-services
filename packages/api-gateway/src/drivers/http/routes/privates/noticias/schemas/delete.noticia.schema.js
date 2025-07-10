const { noticia } = require('./properties/noticia');
const { responseProperties } = require('./properties/responseProperties');

const deleteNoticiaSchema = {
  tags: ['Noticia'],
  description: 'Given a noticiaId, then delete Noticia in database.',
  params: {
    type: 'object',
    properties: {
      noticiaId: { type: 'integer' },
    },
    required: ['noticiaId'],
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

module.exports = { deleteNoticiaSchema };
