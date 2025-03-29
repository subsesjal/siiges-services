const { solicitud } = require('./properties/solicitud');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesProgramasSchema = {
  tags: ['Solicitudes'],
  description: 'Return a list of solicitudes.',
  querystring: {
    usuarioId: {
      type: 'string',
    },
    estatusSolicitudId: {
      type: 'string',
    },
  },
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
                type: ['object', 'null'],
                properties: {
                  id: { type: 'integer' },
                  ...estatusSolicitud,
                  ...responseProperties,
                },
              },
              programa: {
                type: ['object', 'null'],
                properties: {
                  id: { type: 'integer' },
                  solicitudId: { type: 'integer' },
                  plantelId: { type: 'integer' },
                  acuerdoRvoe: { type: 'string' },
                  nombre: { type: 'string' },
                  ...responseProperties,
                  plantel: {
                    type: ['object', 'null'],
                    properties: {
                      id: { type: 'integer' },
                      institucionId: { type: 'integer' },
                      domicilioId: { type: 'integer' },
                      claveCentroTrabajo: { type: 'string' },
                      ...responseProperties,
                      domicilio: {
                        type: ['object', 'null'],
                        properties: {
                          id: { type: 'integer' },
                          ...domicilio,
                          ...responseProperties,
                        },
                      },
                      institucion: {
                        type: ['object', 'null'],
                        properties: {
                          id: { type: 'integer' },
                          tipoInstitucionId: { type: 'integer' },
                          nombre: { type: 'string' },
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
  },
};

module.exports = findAllSolicitudesProgramasSchema;
