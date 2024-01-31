const { responseProperties } = require('./properties/responseProperties');
const { acuerdo } = require('./properties/acuerdo');

const { organoColegiadoId, ...acuerdosBody } = acuerdo;
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
      ...acuerdosBody,
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
