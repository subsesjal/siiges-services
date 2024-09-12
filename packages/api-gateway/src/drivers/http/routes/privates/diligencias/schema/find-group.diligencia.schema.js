const { diligencia } = require('./properties/diligencia');
const { responseProperties } = require('./properties/responseProperties');
const { persona } = require('../../usuarios/schema/properties/persona');

const findGroupDiligencias = {
  tags: ['Diligencias'],
  description: 'Given a solicitudId get their related diligences',
  params: {
    title: 'getOneDiligence',
    type: 'object',
    properties: {
      solicitudId: { type: 'integer' },
    },
    required: ['solicitudId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'integer' },
              ...diligencia,
              ...responseProperties,
              persona: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...persona,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findGroupDiligencias;
