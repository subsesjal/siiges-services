const { solicitudFolio } = require('./properties/solicitudFolio');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudFolioSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Given an object with solicitud folio required data, then save the first time a new solicitud in database.',
  body: {
    type: 'object',
    properties: {
      ...solicitudFolio,
    },
    required: [
      'tipoDocumentoId',
      'tipoSolicitudFolioId',
      'estatusSolicitudFolioId',
      'institucionDgpId',
      'programaId',
      'fecha',
      'folioPago',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            folioSolicitud: { type: 'string' },
            ...solicitudFolio,
            ...responseProperties,
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

module.exports = createSolicitudFolioSchema;
