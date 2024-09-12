const { solicitudSeccion } = require('./properties/solicitudSeccion');
const { responseProperties } = require('./properties/responseProperties');

const { seccionId, solicitudId, ...solicitudSeccionBody } = solicitudSeccion;

const updateSolcitudSeccionObservacionSchema = {
  tags: ['Solicitudes'],
  description: 'Given an object with solicitud and programa data, then save a solicitud observacion in database.',
  params: {
    title: 'updateSolcitudSeccionObservacionSchema',
    type: 'object',
    properties: {
      solicitudId,
      seccionId,
    },
    required: ['solicitudId', 'seccionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitudSeccionBody,
    },
    required: ['observaciones'],
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
