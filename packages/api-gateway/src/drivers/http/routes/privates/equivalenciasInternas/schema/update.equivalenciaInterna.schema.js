const { responseProperties } = require('./properties/responseProperties');

const updateEquivalenciaInternaSchema = {
  tags: ['Equivalencias Internas'],
  description: 'Actualizar una equivalencia interna existente.',
  params: {
    type: 'object',
    properties: { equivalenciaId: { type: 'integer' } },
    required: ['equivalenciaId'],
  },
  body: {
    type: 'object',
    properties: {
      folioExpediente: { type: 'string' },
      folioResolucion: { type: 'string' },
      fechaResolucion: { type: 'string' }, // Cambio de date format
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            alumnoId: { type: 'integer' },
            folioExpediente: { type: 'string' },
            folioResolucion: { type: 'string' },
            fechaResolucion: { type: 'string' }, // Cambio de date format
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { updateEquivalenciaInternaSchema };
