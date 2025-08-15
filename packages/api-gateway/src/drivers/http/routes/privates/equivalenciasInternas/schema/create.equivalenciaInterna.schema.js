const { responseProperties } = require('./properties/responseProperties');

const createEquivalenciaInternaSchema = {
  tags: ['Equivalencias Internas'],
  description: 'Crear una equivalencia interna para un alumno.',
  body: {
    title: 'Datos de equivalencia interna',
    type: 'object',
    properties: {
      alumnoId: { type: 'integer' },
      folioExpediente: { type: 'string' },
      folioResolucion: { type: 'string' },
      fechaResolucion: { type: 'string', format: 'date' },
    },
    required: ['alumnoId', 'folioExpediente', 'folioResolucion', 'fechaResolucion'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            alumnoId: { type: 'integer' },
            folioExpediente: { type: 'string' },
            folioResolucion: { type: 'string' },
            fechaResolucion: { type: 'string', format: 'date' },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createEquivalenciaInternaSchema };
