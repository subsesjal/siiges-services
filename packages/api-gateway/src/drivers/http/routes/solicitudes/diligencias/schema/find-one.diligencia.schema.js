const { diligenceResponse } = require('./properties');

const findOneDiligence = {
  tags: ['Diligence'],
  description: 'Given a diligenceId get a diligence',
  params: {
    title: 'getOneDiligence',
    type: 'object',
    properties: {
      diligenceId: { type: 'integer' },
    },
    required: ['diligenceId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...diligenceResponse,
          },
        },
      },
    },
  },
};

module.exports = findOneDiligence;
