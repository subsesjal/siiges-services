const { diligenceResponse } = require('./properties');

const findGroupDiligence = {
  tags: ['Diligence'],
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
              ...diligenceResponse,
            },
          },
        },
      },
    },
  },
};

module.exports = findGroupDiligence;
