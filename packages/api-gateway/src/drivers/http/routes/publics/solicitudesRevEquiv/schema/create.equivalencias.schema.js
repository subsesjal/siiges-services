const equivalenciaProperties = require('./properties/equivalenciaProperties');
const { responseProperties } = require('./properties/responseProperties');
const { domicilioResponse } = require('../../../privates/solicitudes/representantes/schemas/properties/domicilio.properties');
const { persona } = require('../../../privates/usuarios/schema/properties/persona');

const createEquivalenciaSchema = {
  type: 'object',
  description: 'Create a new equivalencia.',
  body: {
    type: 'object',
    properties: {
      ...equivalenciaProperties,
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
            ...equivalenciaProperties,
            ...responseProperties,
            interesado: {
              type: 'object',
              properties: {
                persona: {
                  type: 'object',
                  properties: {
                    domicilio: {
                      ...domicilioResponse,
                    },
                    ...persona,
                  },
                },
                institucionProcedencia: {
                  type: 'object',
                  properties: {
                    tipoInstitucionId: { type: 'integer' },
                    nombre: { type: 'string' },
                    estadoId: { type: 'string' },
                    nombreCarrera: { type: 'string' },
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
                  },
                },
              },
            },
            asignaturaAntecedente: {
              type: 'object',
              properties: {
                nombre: { type: 'string' },
                calificacion: { type: 'string' },
              },
            },
            asignaturaEquivalente: {
              type: 'object',
              properties: {
                asignaturaId: { type: 'integer' },
                nombre: { type: 'string' },
                calificacion: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createEquivalenciaSchema;
