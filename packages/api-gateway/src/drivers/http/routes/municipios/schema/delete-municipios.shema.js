const { municipio } = require('./properties/municipio');
const { responseProperties } = require('./properties/responseProperties');

const deleteMunicipiosSchema = {
  tags: ['Municipio'],
  description:
    'Given a municipio id, then delete the municipio in database.',
  params: {
    type: 'object',
    properties: {
      municipioId: { type: 'integer' },
    },
    required: ['municipioId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...municipio,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deleteMunicipiosSchema;
