const { solicitud } = require('./properties/solicitud');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { tipoSolicitud } = require('./properties/tipoSolicitud');
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
    limit: {
      type: 'integer',
    },
    offset: {
      type: 'integer',
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
              tipoSolicitud: {
                type: ['object', 'null'],
                properties: {
                  id: { type: 'integer' },
                  ...tipoSolicitud,
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
        filterOptions: {
          type: 'object',
          properties: {
            currentPageItems: { type: 'integer' },
            totalItems: { type: 'integer' },
            currentPage: { type: 'integer' },
            totalPages: { type: 'integer' },
          },
        },
      },
    },
  },
};

module.exports = findAllSolicitudesProgramasSchema;
