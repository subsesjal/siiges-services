const { solicitudSeccion } = require('./properties/solicitudSeccion');
const { responseProperties } = require('./properties/responseProperties');

const { seccionId, solicitudId } = solicitudSeccion;

const findOneSolcitudSeccionObservacionSchema = {
  tags: ['Solicitudes'],
  description: 'Given an object with solicitud and programa data, then save a solicitud observacion in database.',
  params: {
    title: 'Get a Solcitud Seccion Observacion Schema',
    type: 'object',
    properties: {
      solicitudId,
      seccionId,
    },
    required: ['solicitudId', 'seccionId'],
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

module.exports = { findOneSolcitudSeccionObservacionSchema };
