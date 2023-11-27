const { acuerdo } = require('./properties/acuerdo');
const { responseProperties } = require('./properties/responseProperties');

const findOneAcuerdoSchema = {
  tags: ['Organos Colegiados'],
  description: 'Get one Acuerdo.',
  params: {
    type: 'object',
    properties: { acuerdoId: { type: 'integer' } },
    required: ['acuerdoId'],
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

module.exports = { findOneAcuerdoSchema };
