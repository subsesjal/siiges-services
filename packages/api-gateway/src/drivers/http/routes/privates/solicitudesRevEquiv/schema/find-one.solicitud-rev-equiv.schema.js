const { responseProperties } = require('./properties/responseProperties');
const { solicitudRevEquiv } = require('./properties/solicitudRevEquiv');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { persona } = require('../../usuarios/schema/properties/persona');
const { institucionProcedencia } = require('./properties/institucionProcedencia');
const { institucionDestino } = require('./properties/institucionDestino');
const { asignaturaAntecedente } = require('./properties/asignaturaAntecedente');
const { asignaturaEquivalente } = require('./properties/asignaturaEquivalente');

const findOneEquivalenciaSchema = {
  tags: ['Solicitudes Rev Equiv'],
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
            ...solicitudRevEquiv,
            ...responseProperties,
            interesado: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                personaId: { type: 'integer' },
                institucionProcedenciaId: { type: 'integer' },
                institucionDestinoId: { type: 'integer' },
                ...responseProperties,
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
    },
  },
};

module.exports = findOneEquivalenciaSchema;
