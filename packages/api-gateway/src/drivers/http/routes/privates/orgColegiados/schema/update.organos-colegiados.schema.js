const { organoColegiado } = require('./properties/organoColegiado');
const { responseProperties } = require('./properties/responseProperties');

const updateOrgColegiadoSchema = {
  tags: ['Organos Colegiados'],
  description: 'Update Organo Colegiado.',
  params: {
    type: 'object',
    properties: { orgColegiadoId: { type: 'integer' } },
    required: ['orgColegiadoId'],
  },
  body: {
    type: 'object',
    properties: { ...organoColegiado },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...organoColegiado,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { updateOrgColegiadoSchema };
