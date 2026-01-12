const { firmaCertificado } = require('./properties/firmaCertificado');
const { responseProperties } = require('./properties/responseProperties');

const firmaCertificadoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Firma un documento electrónicamente utilizando el servicio de Firma Electrónica REST del Gobierno de Jalisco.',
  body: {
    type: 'object',
    properties: {
      ...firmaCertificado,
    },
    required: [
      'solicitudFolioId',
      'pkcs7',
      'claveDocumento',
    ],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            solicitudFolioId: { type: 'integer' },
            folioValidacion: { type: 'string' },
            hashObjetoFirmado: { type: 'string' },
            idDocumento: { type: 'string' },
            datosFirmante: { type: 'string' },
            objetoFirmado: { type: 'string' },
            firmaResponse: { type: 'string' },
            uriValidacion: { type: 'string' },
            tipoDocumento: { type: 'string' },
            estatusFirmado: { type: 'string' },
            fechaFirmado: { type: 'string', format: 'date-time' },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = firmaCertificadoSchema;
