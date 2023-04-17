const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');
const { programaTurnos } = require('./properties/programaTurnos');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudProgramaSchema = {
  tags: ['Solicitudes'],
  description: 'Given an object with solicitud and programa data, then update a solicitud in database.',
  params: {
    title: 'updateSolicitudProgramaSchema',
    type: 'object',
    properties: {
      solicitudId: { type: 'integer' },
    },
    required: ['solicitudId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitud,
      programa: {
        type: 'object',
        properties: {
          ...programa,
          programaTurnos: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'integer',
              enum: [1, 2, 3, 4],
            },
          },
        },
      },
    },
    required: ['programa'],
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            folio: { type: 'string' },
            ...solicitud,
            ...responseProperties,
            programa: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
                programaTurnos: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...programaTurnos,
                      ...responseProperties,
                    },
                  },
                },
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createSolicitudProgramaSchema;
