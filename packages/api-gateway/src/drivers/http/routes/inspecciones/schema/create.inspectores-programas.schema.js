const { inspectorPrograma } = require('./properties/inspectorPrograma');
const { responseProperties } = require('./properties/responseProperties');

const createInspectoresProgramasSchema = {
  tags: ['Inspecciones'],
  description: 'Create a new inspector programa',
  body: {
    type: 'object',
    properties: {
      inspectorId: { type: 'integer' },
      programaId: { type: 'integer' },
      estatusInspeccionId: { type: 'integer' },
      fechaAsignada: { type: 'string', format: 'date-time' },
      folio: { type: 'string' },
    },
    required: ['inspectorId', 'programaId', 'estatusInspeccionId', 'fechaAsignada', 'folio'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...inspectorPrograma,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspectoresProgramasSchema;
