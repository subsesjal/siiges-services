const { institucion } = require('./properties/institucion');
const { responseProperties } = require('./properties/responseProperties');

const updateInstitucionSchema = {
  tags: ['Institucion'],
  description: 'Given an object with institucion required data and institucionId, then update institucion in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...institucion,
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
            usuarioId: { type: 'integer' },
            ...institucion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateInstitucionSchema;
