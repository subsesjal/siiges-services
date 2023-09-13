const { plantelSeguridadSistema } = require('./properties/plantelSeguridadSistema');
const { responseProperties } = require('./properties/responseProperties');

const createUpdatePlantelSeguridadSchema = {
  tags: ['Plantel'],
  description: 'Given an object with plantel seguridad required data, then save a record of plantel-seguridad in database.',
  params: {
    title: 'createUpdatePlantelSeguridadSchema',
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
    },
    required: ['plantelId'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        ...plantelSeguridadSistema,
      },
      required: ['seguridadSistemaId'],
    },
    minItems: 8,
    maxItems: 8,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...plantelSeguridadSistema,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = createUpdatePlantelSeguridadSchema;
