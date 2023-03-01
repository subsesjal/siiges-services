const { solicitud } = require('./properties/solicitud');
const { usuario } = require('./properties/usuario');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesUsuarioSchema = {
  tags: ['Solicitudes'],
  description: 'Return a list of solicitudes.',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...solicitud,
              folio: { type: 'string' },
              ...responseProperties,
              estatusSolicitud: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...estatusSolicitud,
                  ...responseProperties,
                },
              },
              usuario: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...usuario,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findAllSolicitudesUsuarioSchema;
