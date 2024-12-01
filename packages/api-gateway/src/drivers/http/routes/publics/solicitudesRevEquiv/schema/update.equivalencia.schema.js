const { equivalencia } = require('./properties/equivalenciaProperties');
const { responseProperties } = require('./properties/responseProperties');
const { domicilio } = require('../../../privates/solicitudes/representantes/schemas/properties/domicilio.properties');
const { persona } = require('../../../privates/usuarios/schema/properties/persona');

const updateEquivalenciaSchema = {
  type: 'object',
  description: 'update a equivalencia.',
  body: {
    type: 'object',
    properties: {
      ...equivalencia,
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            interesadoId: { type: 'integer' },
            ...equivalencia,
            folioSolicitud: { type: 'string' },
            observaciones: { type: 'string' },
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
