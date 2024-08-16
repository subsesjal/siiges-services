const { solicitud } = require('./properties/solicitud');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const deleteAlumnoSchema = {
  tags: ['Solicitudes'],
  description: 'Given an SolicitudId delete an Solicitud in data base',
  params: {
    title: 'delete solicitud',
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['solicitudId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitud,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = deleteAlumnoSchema;
