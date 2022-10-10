const { institucion } = require('./properties/institucion');
const { responseProperties } = require('./properties/responseProperties');

const deleteInstitucionSchema = {
  tags: ['Institucion'],
  description: 'Given a institucionId, then delete Institución in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuarioId: { type: 'integer' },
            ...institucion,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = deleteInstitucionSchema;
