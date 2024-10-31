const { responseProperties } = require('./properties/responseProperties');
const { equivalencia } = require('./properties/equivalenciaProperties');
const { domicilio } = require('../../../privates/solicitudes/representantes/schemas/properties/domicilio.properties');
const { persona } = require('../../../privates/usuarios/schema/properties/persona');
const { institucionProcedencia } = require('./properties/institucionProcedenciaProperties');
const { institucionDestino } = require('./properties/institucionDestinoProperties');
const { asignaturaAntecedente } = require('./properties/asignaturasAntecedentesProperties');
const { asignaturaEquivalente } = require('./properties/asignaturasEquivalentesProperties');

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
            id: { type: 'integer' },
            ...equivalencia,
            interesadoId: { type: 'integer' },
            folioSolicitud: { type: 'string' },
            observaciones: { type: 'string', nullable: true },
            ...responseProperties,
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
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
              },
            },
            domicilio: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...domicilio,
                ...responseProperties,
              },
            },
            institucionProcedencia: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...institucionProcedencia,
                ...responseProperties,
              },
            },
            institucionDestino: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...institucionDestino,
                ...responseProperties,
              },
            },
            asignaturasAntecedentes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...asignaturaAntecedente,
                  ...responseProperties,
                },
              },
            },
            asignaturasEquivalentes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...asignaturaEquivalente,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findOneEquivalenciaSchema;
