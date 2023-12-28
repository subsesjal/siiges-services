const { files } = require('./properties/files');
const { responseProperties } = require('../../acuerdos/schema/properties/responseProperties');
const { tipoEntidadObj, tipoDocumentoObj } = require('../../../../../../../files/src/utils/constants');

const mapAndSortProperties = (properties) => properties
  .map((propertie) => propertie.name).sort();

const findFileSchema = {
  tags: ['Files'],
  summary: 'Encuentra un archivo basado en criterios',
  description: 'Retorna archivos basados en los parámetros de consulta proporcionados',
  querystring: { // Aquí se define el esquema para los parámetros de consulta
    type: 'object',
    required: ['tipoEntidad', 'entidadId', 'tipoDocumento'],
    properties: {
      tipoEntidad: {
        type: 'string',
        enum: mapAndSortProperties(tipoEntidadObj),
        description: 'El tipo de entidad',
      },
      entidadId: {
        type: 'string', // o 'number' si los IDs son numéricos
        description: 'El ID de la entidad',
      },
      tipoDocumento: {
        type: 'string',
        enum: mapAndSortProperties(tipoDocumentoObj),
        description: 'El tipo de documento',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...files,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { findFileSchema };
