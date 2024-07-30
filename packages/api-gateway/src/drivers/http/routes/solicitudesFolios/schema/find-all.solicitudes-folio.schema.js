const { solicitudFolio } = require('./properties/solicitudFolio');
const { tipoDocumento } = require('./properties/tipoDocumento');
const { tipoSolicitudFolio } = require('./properties/tipoSolicitudFolio');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { estatusSolicitudFolio } = require('./properties/estatusSolicitudFolio');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesProgramasSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Return a list of solicitudes.',
  querystring: {
    type: 'object',
    properties: {
      estatusSolicitudFolioId: { type: 'string' },
      tipoDocumentoId: { type: 'string' },
      tipoSolicitudFolioId: { type: 'string' },
      programaId: { type: 'string' },
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
              folioSolicitud: { type: 'string' },
              ...solicitudFolio,
              ...responseProperties,
              estatusSolicitudFolio: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...estatusSolicitudFolio,
                  ...responseProperties,
                },
              },
              tipoDocumento: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...tipoDocumento,
                  ...responseProperties,
                },
              },
              tipoSolicitudFolio: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...tipoSolicitudFolio,
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
  },
};

module.exports = findAllSolicitudesProgramasSchema;
