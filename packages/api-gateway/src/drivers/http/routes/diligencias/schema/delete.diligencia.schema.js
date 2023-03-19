const { responseProperties } = require('./properties/responseProperties');
const { diligencia } = require('./properties/diligencia');

const deleteOneDiligencias = {
  tags: ['Diligencia'],
  description: 'Given a diligenciaId delete a diligencia',
  params: {
    title: 'delete diligencia',
    type: 'object',
    properties: {
      diligenciaId: { type: 'integer' },
    },
    required: ['diligenciaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...diligencia,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deleteOneDiligencias;
