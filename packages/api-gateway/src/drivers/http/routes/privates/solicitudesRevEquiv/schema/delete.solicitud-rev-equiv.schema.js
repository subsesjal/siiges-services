const { solicitudRevEquiv } = require('./properties/solicitudRevEquiv');
const { responseProperties } = require('./properties/responseProperties');

const deleteEquivalenciaSchema = {
  tags: ['Solicitudes Rev Equiv'],
  description: 'Given an equivalenciaId, delete the equivalencia record from the database.',
  params: {
    title: 'deleteEquivalenciaSchema',
    type: 'object',
    properties: {
      equivalenciaId: { type: 'integer' },
    },
    required: ['equivalenciaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudRevEquiv,
            ...responseProperties,
          },
        },
      },
    },
    404: {
      description: 'Equivalencia not found',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

module.exports = deleteEquivalenciaSchema;
