const { acuerdo } = require('./properties/acuerdo');
const { responseProperties } = require('./properties/responseProperties');

const findGroupAcuerdosSchema = {
  tags: ['Organos Colegiados'],
  description: 'Get a group Acuerdos by Organos Colegiados.',
  params: {
    type: 'object',
    properties: { orgColegiadoId: { type: 'integer' } },
    required: ['orgColegiadoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
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
  },
};

module.exports = { findGroupAcuerdosSchema };
