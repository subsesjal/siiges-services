const createFirmaCertificadoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Firma electrónicamente un documento usando el servicio del Gobierno de Jalisco',
  querystring: {
    type: 'object',
    properties: {
      folioInterno: { type: 'string', description: 'Folio interno del documento (ej: FCSDGFDG)' },
    },
    required: ['folioInterno'],
  },
  body: {
    type: 'object',
    properties: {
      pkcs7: { type: 'string', description: 'PKCS7 generado en Base64' },
      objetoPorFirmar: {
        type: 'object',
        description: 'Objeto JSON con los datos del documento a firmar',
        properties: {
          folioInterno: { type: 'string' },
          foja: { type: 'integer' },
          libro: { type: 'integer' },
          tipoDocumento: { type: 'string' },
          tipoSolicitudFolio: { type: 'string' },
          nombre: { type: 'string' },
          apellidoPaterno: { type: 'string' },
          apellidoMaterno: { type: 'string' },
          curp: { type: 'string' },
          programa: {
            type: 'object',
            properties: {
              rvoe: { type: 'string' },
              nombre: { type: 'string' },
              nivel: { type: 'string' },
            },
          },
          institucion: {
            type: 'object',
            properties: {
              nombre: { type: 'string' },
              plantel: {
                type: 'object',
                properties: {
                  cct: { type: 'string' },
                  direccion: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    required: ['pkcs7', 'objetoPorFirmar'],
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
            objetoPorFirmar: { type: 'string' },
            folioInterno: { type: 'string' },
            identificadorUnico: { type: 'string' },
            hashObjetoFirmado: { type: 'string' },
            secuenciaDocumento: { type: 'string' },
            datosFirmante: { type: 'string' },
            objetoFirmado: { type: 'string' },
            firmaResponse: { type: 'string' },
            uriValidacion: { type: 'string' },
            tipoDocumento: { type: 'string' },
            identificadorDocumento: { type: 'string' },
            dependenciaDocumento: { type: 'string' },
            firmaDigital: { type: 'string' },
            estatusFirmado: { type: 'string' },
            fechaFirmado: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
};

module.exports = { createFirmaCertificadoSchema };
