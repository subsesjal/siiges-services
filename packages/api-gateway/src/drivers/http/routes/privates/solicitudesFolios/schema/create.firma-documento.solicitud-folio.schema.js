const { firma } = require('./properties/firma');
const { responseProperties } = require('./properties/responseProperties');

const createFirmaDocumentoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Firma electrónicamente un documento usando el servicio del Gobierno de Jalisco',
  querystring: {
    type: 'object',
    properties: {
      folioInterno: { type: 'string' },
    },
    required: ['folioInterno'],
  },
  body: {
    type: 'object',
    properties: {
      pkcs7: { type: 'string' },
      objetoPorFirmar: { type: 'object' },
      tipoDocumento: { type: 'string' },
    },
    required: ['pkcs7', 'objetoPorFirmar', 'tipoDocumento'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...firma,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createFirmaDocumentoSchema };
