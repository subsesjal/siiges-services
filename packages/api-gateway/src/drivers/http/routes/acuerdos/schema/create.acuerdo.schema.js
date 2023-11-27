const { responseProperties } = require('./properties/responseProperties');
const { acuerdo } = require('./properties/acuerdo');

const createAcuerdoSchema = {
  tags: ['Organos Colegiados'],
  description: 'Create acuerdo.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...acuerdo,
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
            ...acuerdo,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createAcuerdoSchema };
