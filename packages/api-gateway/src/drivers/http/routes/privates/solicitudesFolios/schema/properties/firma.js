const firma = {
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
};

module.exports = { firma };
