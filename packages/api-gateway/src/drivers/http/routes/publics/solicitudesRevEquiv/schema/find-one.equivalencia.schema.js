const { responseProperties } = require('./properties/responseProperties');
const equivalenciaProperties = require('./properties/equivalenciaProperties');
const { domicilioResponse } = require('../../../privates/solicitudes/representantes/schemas/properties/domicilio.properties');
const { persona } = require('../../../privates/usuarios/schema/properties/persona');
const institucionProcedenciaProperties = require('./properties/institucionProcedenciaProperties');
const institucionDestinoProperties = require('./properties/institucionDestinoProperties');
const asignaturasAntecedentesProperties = require('./properties/asignaturasAntecedentesProperties');
const asignaturasEquivalentesProperties = require('./properties/asignaturasEquivalentesProperties');

const findOneEquivalenciaSchema = {
  tags: ['equivalencia'],
  description: 'Returns an Equivalencia by providing an equivalencia ID.',
  params: {
    title: 'findOneEquivalenciaSchema',
    type: 'object',
    properties: {
      equivalenciaId: { type: 'integer' },
    },
    required: ['equivalenciaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            SolicitudEquivalencia: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...equivalenciaProperties,
                interesadoId: { type: 'integer' },
                folioSolicitud: { type: 'string' },
                observaciones: { type: 'string', nullable: true },
                ...responseProperties,
              },
            },
            interesado: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                personaId: { type: 'integer' },
                institucionProcedenciaId: { type: 'integer' },
                institucionDestinoId: { type: 'integer' },
                ...responseProperties,
              },
            },
            persona: {
              type: 'object',
              properties: {
                ...persona,
                ...responseProperties,
              },
            },
            domicilio: {
              ...domicilioResponse,
            },
            institucionProcedencia: {
              type: 'object',
              properties: {
                ...institucionProcedenciaProperties,
                ...responseProperties,
              },
            },
            institucionDestino: {
              type: 'object',
              properties: {
                ...institucionDestinoProperties,
                ...responseProperties,
              },
            },
            asignaturasAntecedentes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  ...asignaturasAntecedentesProperties,
                  ...responseProperties,
                },
              },
            },
            asignaturasEquivalentes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  ...asignaturasEquivalentesProperties,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: 'Equivalencia not found',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

module.exports = findOneEquivalenciaSchema;
