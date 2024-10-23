const { institucionDgp } = require('./properties/institucionesDgp');
const { responseProperties } = require('./properties/responseProperties');

const createInstitucionDgpSchema = {
  tags: ['Instituciones'],
  description: 'Crea una institución DGP a partir de los datos proporcionados.',
  body: {
    type: 'array',
    required: ['institucionId', 'claveDgp', 'nombreInstitucionDgp'],
    properties: {
      institucionId: { type: 'integer' },
      claveDgp: { type: 'string', maxLength: 255 },
      nombreInstitucionDgp: { type: 'string', maxLength: 255 },
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
            ...institucionDgp,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInstitucionDgpSchema;
