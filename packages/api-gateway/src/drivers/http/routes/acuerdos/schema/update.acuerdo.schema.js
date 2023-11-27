const { acuerdo } = require('./properties/acuerdo');
const { responseProperties } = require('./properties/responseProperties');

const updateAcuerdoSchema = {
  tags: ['Organos Colegiados'],
  description: 'Update Acuerdo.',
  params: {
    type: 'object',
    properties: { acuerdoId: { type: 'integer' } },
    required: ['acuerdoId'],
  },
  body: {
    type: 'object',
    properties: { ...acuerdo },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...acuerdo,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { updateAcuerdoSchema };
