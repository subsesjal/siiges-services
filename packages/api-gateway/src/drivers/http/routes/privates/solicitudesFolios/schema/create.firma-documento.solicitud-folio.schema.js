const { autoridad } = require('./properties/autoridad');

const createFirmaDocumentoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Firma electrónicamente uno o más documentos usando el servicio del Gobierno de Jalisco',
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        pkcs7: { type: 'string' },
        folioInterno: { type: 'string' },
        objetoPorFirmar: { type: 'object' },
        tipoDocumento: { type: 'string' },
        autoridad: {
          type: 'object',
          properties: { ...autoridad },
          required: ['tipoFirmante', 'cargoFirmante', 'curp', 'nombre'],
        },
      },
      required: ['pkcs7', 'folioInterno', 'objetoPorFirmar', 'tipoDocumento', 'autoridad'],
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              folioInterno: { type: 'string' },
              estatusFirmado: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

module.exports = { createFirmaDocumentoSchema };
