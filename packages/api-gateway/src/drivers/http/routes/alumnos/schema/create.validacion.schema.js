const { validacion } = require('./properties/validacion');
const { responseProperties } = require('./properties/responseProperties');

const { alumnoId, ...data } = validacion;

const createValidacionSchema = {
  tags: ['Alumnos'],
  description: 'Validate students.',
  params: {
    type: 'object',
    properties: {
      alumnoId: { type: 'number' },
    },
    required: ['alumnoId'],
  },
  body: {
    type: 'object',
    properties: {
      ...data, // Asegúrate de que esto expanda las propiedades correctamente
      folio: { type: 'string' },
    },
    required: [
      'usuarioId', // Verifica que estas propiedades realmente existan en `data`
      'estadoId',
      'nivelId',

      'situacionValidacionId',
      'folio',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...responseProperties, // Inclusión de propiedades adicionales
          },
        },
      },
    },
  },
};

module.exports = { createValidacionSchema };
