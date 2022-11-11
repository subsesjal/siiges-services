const { diligence, diligenceResponse } = require('./properties');

const updateDiligence = {
  tags: ['Diligence'],
  description: 'Given a diligenceId update a diligence',
  params: {
    title: 'update diligence',
    type: 'object',
    properties: {
      diligenceId: { type: 'integer' },
    },
    required: ['diligenceId'],
  },
  body: {
    title: 'getOneDiligence',
    type: 'object',
    properties: {
      ...diligence,
    },
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

module.exports = updateDiligence;
