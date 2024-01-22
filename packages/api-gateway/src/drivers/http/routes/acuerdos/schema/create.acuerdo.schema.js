const { responseProperties } = require('./properties/responseProperties');
const { acuerdo } = require('./properties/acuerdo');

const { organoColegiadoId, ...acuerdoosBody } = acuerdo;
const createAcuerdoSchema = {
  tags: ['Organos Colegiados'],
  description: 'Create acuerdo.',
  params: {
    type: 'object',
    properties: { organoColegiadoId: { type: 'integer' } },
    required: ['organoColegiadoId'],
  },
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...acuerdoosBody,
    },
    required: ['numero', 'estatus', 'fecha'],
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
