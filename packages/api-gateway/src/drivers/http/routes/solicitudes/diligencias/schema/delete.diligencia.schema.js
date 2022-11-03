const { diligenceResponse } = require('./properties');

const deleteOneDiligence = {
  tags: ['Diligence'],
  description: 'Given a diligenceId delete a diligence',
  params: {
    title: 'delete diligence',
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

module.exports = deleteOneDiligence;
