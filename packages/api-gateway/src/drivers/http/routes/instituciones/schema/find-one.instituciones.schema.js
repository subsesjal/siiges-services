const { institucion } = require('./properties/institucion');
const { responseProperties } = require('./properties/responseProperties');

const findOneInstitucionSchema = {
  tags: ['Institucion'],
  description: 'Given a institucion id, then return a institucion of database.',
  params: {
    title: 'getInstitucionSchema',
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
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
            ...institucion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = findOneInstitucionSchema;
