const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { responseProperties } = require('./properties/responseProperties');

const findOneSolicitudProgramaSchema = {
  tags: ['Solicitudes'],
  description: 'Return one solicitud from db.',
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
            estatusSolicitud: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...estatusSolicitud,
                ...responseProperties,
              },
            },
            programa: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findOneSolicitudProgramaSchema;
