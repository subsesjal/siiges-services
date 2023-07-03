const { solicitud } = require('./properties/solicitud');
const { solicitudSeccion } = require('./properties/solicitudSeccion');
const { responseProperties } = require('./properties/responseProperties');

const updateSolcitudSeccionObservacionSchema = {
  tags: ['Solicitudes'],
  description: 'Given an object with solicitud and programa data, then save a solicitud observacion in database.',
  params: {
    title: 'updateSolcitudSeccionObservacionSchema',
    type: 'object',
    properties: {
      solicitudId: { type: 'integer' },
      seccionId: { type: 'integer' },
    },
    required: ['solicitudId', 'seccionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitudSeccion,
      ...solicitud,
    },
    required: ['observaciones'],
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
            ...solicitudSeccion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateSolcitudSeccionObservacionSchema;
