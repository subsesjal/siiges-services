const { responseProperties } = require('./properties/responseProperties');

const findOneInspectoresProgramasSchema = {
  tags: ['Inspecciones'],
  description: 'Find one a inspector programs',
  params: {
    title: 'find One Inspector Program',
    type: 'object',
    properties: {
      inspectorId: { type: 'integer' },
    },
    required: ['inspectorId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              programaId: { type: 'integer' },
              estatusInspeccionId: { type: 'integer' },
              fecha: { type: 'string', format: 'date-time' },
              fechaAsignada: { type: 'string', format: 'date-time' },
              resultado: { type: 'string' },
              folio: { type: 'string' },
              ...responseProperties,
              programa: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  nombre: { type: 'string' },
                  solicitud: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      folio: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { findOneInspectoresProgramasSchema };
