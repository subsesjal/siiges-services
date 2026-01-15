const createFirmaCertificadoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Firma electrónicamente un documento usando el servicio del Gobierno de Jalisco',
  consumes: ['multipart/form-data'],
  querystring: {
    type: 'object',
    properties: {
      folioDocumento: { type: 'string', description: 'Clave del catálogo de firma electrónica (ej: D0001)' },
    },
    required: ['folioDocumento'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            pkcs7: { type: 'string' },
            identificadorUnico: { type: 'string' },
            hashObjetoFirmado: { type: 'string' },
            secuenciaDocumento: { type: 'string' },
            datosFirmante: { type: 'string' },
            objetoFirmado: { type: 'string' },
            uriValidacion: { type: 'string' },
            tipoDocumento: { type: 'string' },
            estatusFirmado: { type: 'string' },
            fechaFirmado: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
};

module.exports = { createFirmaCertificadoSchema };
