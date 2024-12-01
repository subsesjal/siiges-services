const { solicitudRevEquiv } = require('./properties/solicitudRevEquiv');
const { responseProperties } = require('./properties/responseProperties');
const { domicilio } = require('../../solicitudes/representantes/schemas/properties/domicilio.properties');
const { persona } = require('../../usuarios/schema/properties/persona');

const updateEquivalenciaSchema = {
  tags: ['Solicitudes Rev Equiv'],
  description: 'Returns an Equivalencia by providing an equivalencia ID.',
  body: {
    type: 'object',
    properties: { ...solicitudRevEquiv },
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
                persona: {
                  type: 'object',
                  properties: {
                    ...persona,
                    ...responseProperties,
                    domicilio: {
                      ...domicilio,
                      ...responseProperties,
                    },
                  },
                },
                institucionProcedencia: {
                  type: 'object',
                  properties: {
                    tipoInstitucionId: { type: 'integer' },
                    nombre: { type: 'string' },
                    estadoId: { type: 'string' },
                    nombreCarrera: { type: 'string' },
                    ...responseProperties,
                  },
                },
                institucionDestino: {
                  type: 'object',
                  properties: {
                    tipoInstitucionId: { type: 'integer' },
                    programaId: { type: 'integer' },
                    nombre: { type: 'string' },
                    acuerdoRvoe: { type: 'string' },
                    nombreCarrera: { type: 'string' },
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
};

module.exports = updateEquivalenciaSchema;
