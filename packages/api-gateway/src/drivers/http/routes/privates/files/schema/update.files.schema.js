const { files } = require('./properties/files');
const { responseProperties } = require('../../acuerdos/schema/properties/responseProperties');

const uploadFileSchema = {
  tags: ['Files'],
  summary: 'Carga un archivo para una asignatura',
  description: 'Carga un archivo para una asignatura',
  consumes: ['multipart/form-data'],
  body: {
    type: 'object',
    required: ['archivoAdjunto', 'tipoEntidad', 'entidadId', 'tipoDocumento'],
    properties: {
      archivoAdjunto: {
        type: 'string',
        format: 'binary',
        description: 'El archivo a cargar',
        isFile: true,
      },
      tipoEntidad: {
        type: 'string',
        description: 'El tipo de entidad',
      },
      entidadId: {
        type: 'string',
        description: 'El ID de la entidad',
      },
      tipoDocumento: {
        type: 'string',
        description: 'El tipo de documento',
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        ...files,
        ...responseProperties,
      },
    },
  },
};

module.exports = uploadFileSchema;
