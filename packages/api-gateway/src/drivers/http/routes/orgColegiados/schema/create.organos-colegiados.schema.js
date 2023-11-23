const { responseProperties } = require('./properties/responseProperties');
const { organoColegiado } = require('./properties/organoColegiado');

const createOrgColegiadoSchema = {
  tags: ['Organos Colegiados'],
  description: 'Create an organo colegiado.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...organoColegiado,
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
            ...organoColegiado,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createOrgColegiadoSchema };
