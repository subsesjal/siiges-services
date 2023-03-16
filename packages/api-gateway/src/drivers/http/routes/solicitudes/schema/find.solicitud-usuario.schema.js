const { solicitud } = require('./properties/solicitud');
const { usuario } = require('./properties/usuario');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { responseProperties } = require('./properties/responseProperties');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { tipoSolicitud } = require('./properties/solicitud');

const findAllSolicitudesUsuarioSchema = {
  tags: ['Solicitudes'],
  description: 'Return a list of solicitudes by user.',
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
                  tipoSolicitud: {
                    id: { type: 'integer' },
                    ...tipoSolicitud,
                    ...responseProperties,
                  },
                },
              },
              usuario: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...usuario,
                  ...responseProperties,
                },
                plantel: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...plantel,
                        ...responseProperties,
                      },
                    },
                  },
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
