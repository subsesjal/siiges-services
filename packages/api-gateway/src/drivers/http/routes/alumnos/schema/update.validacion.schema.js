const { validacion } = require('./properties/validacion');
const { responseProperties } = require('./properties/responseProperties');

const { alumnoId, ...data } = validacion;

const updateValidacionSchema = {
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
  },
  response: {
    200: {
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

module.exports = { updateValidacionSchema };
