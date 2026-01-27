// External dependencies
const { models, queries } = require('@siiges-services/core');

const { DocumentoFirmado } = models;

const {
  createQuery,
  findOneQuery,
  findAllQuery,
} = queries;

module.exports = {
  createDocumentoFirmadoQuery: createQuery(DocumentoFirmado),
  findOneDocumentoFirmadoQuery: findOneQuery(DocumentoFirmado),
  findAllDocumentosFirmadosQuery: findAllQuery(DocumentoFirmado),
};
