const { validacion } = require('./properties/validacion');
const { responseProperties } = require('./properties/responseProperties');

const { alumnoId, ...data } = validacion;

const createValidacionSchema = {
  tags: ['Alumnos'],
  description:
    'Validate students.',
  params: {
    type: 'object',
    properties: { alumnoId },
    required: ['alumnoId'],
  },
  body: {
    type: 'object',
    properties: {
      ...data,
    },
    required: [
      'usuarioId',
      'estadoId',
      'nivelId',
      'tipoValidacionId',
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
            ...validacion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createValidacionSchema };
