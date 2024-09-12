const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { planMaestro } = require('./properties/planMaestro');

const createPlanMaestroSchema = {
  tags: ['Planes Maestros'],
  description: 'Create a plan maestro.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...planMaestro,
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
            ...planMaestro,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createPlanMaestroSchema };
