const { files } = require('./properties/files');
const { responseProperties } = require('../../acuerdos/schema/properties/responseProperties');

const uploadFileSchema = {
  tags: ['Files'],
  summary: 'Carga un archivo para una asignatura',
  description: 'Carga un archivo para una asignatura',
  consumes: ['multipart/form-data'],
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
