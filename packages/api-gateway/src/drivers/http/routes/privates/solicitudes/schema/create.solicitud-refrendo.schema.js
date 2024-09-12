const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');
const { programaTurnos } = require('./properties/programaTurnos');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudProgramaSchema = {
  tags: ['Solicitudes'],
  description: 'Given an object with solicitud and programa required data, then save the first time a new solicitud in database.',
  body: {
    type: 'object',
    properties: {
      ...solicitud,
      programa: {
        type: 'object',
        properties: {
          ...programa,
        },
        required: ['modalidadId', 'plantelId'],
      },
    },
    required: ['tipoSolicitudId', 'usuarioId', 'estatusSolicitudId', 'programa'],
    additionalProperties: false,
  },
  response: {
    201: {
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
