const { solicitudFolio } = require('./properties/solicitudFolio');
const { tipoDocumento } = require('./properties/tipoDocumento');
const { tipoSolicitudFolio } = require('./properties/tipoSolicitudFolio');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { estatusSolicitudFolio } = require('./properties/estatusSolicitudFolio');
const { responseProperties } = require('./properties/responseProperties');

const findOneSolicitudFolioSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Return an object solicitud folios.',
  params: {
    title: 'findOneSolicitudFolioSchema',
    type: 'object',
    properties: {
      solicitudFolioId: { type: 'integer' },
    },
    required: ['solicitudFolioId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
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
};

module.exports = findOneSolicitudFolioSchema;
