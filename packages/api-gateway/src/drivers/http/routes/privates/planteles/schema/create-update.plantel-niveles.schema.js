const { plantelEdificioNivel } = require('./properties/plantelEdificioNivel');
const { responseProperties } = require('./properties/responseProperties');

const createUpdatePlantelNivelesSchema = {
  tags: ['Plantel'],
  description: 'Given an array with plantel edificio nivel required data, then save a record of plantel-edificio-niveles in database.',
  params: {
    title: 'createUpdatePlantelNivelesSchema',
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
        ...plantelEdificioNivel,
      },
      required: ['edificioNivelId'],
    },
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
              ...plantelEdificioNivel,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = createUpdatePlantelNivelesSchema;
