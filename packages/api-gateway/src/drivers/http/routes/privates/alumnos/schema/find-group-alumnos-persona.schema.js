const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const findGroupAlumnosPersonaSchema = {
  tags: ['Alumnos'],
  description: 'Return an array of alumnos filtered by persona or programa params.',
  querystring: {
    title: 'findGroupAlumnosPersonaSchema',
    type: 'object',
    properties: {
      curp: { type: 'string' },
      nombre: { type: 'string' },
      apellidoPaterno: { type: 'string' },
      apellidoMaterno: { type: 'string' },
      matricula: { type: 'string' },
      acuerdoRvoe: { type: 'string' },
      cct: { type: 'string' },
    },
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
              ...alumno,
              ...responseProperties,
              persona: {
                type: 'object',
                additionalProperties: true,
                properties: {
                  id: { type: 'integer' },
                  ...persona,
                  ...responseProperties,
                },
              },
              equivalencia: {
                type: 'object',
                additionalProperties: true,
                nullable: true,
              },
              alumnoTipoTramites: {
                type: 'array',
                items: { type: 'object', additionalProperties: true },
              },
              programa: {
                type: 'object',
                additionalProperties: true,
                properties: {
                  id: { type: 'integer' },
                  plantel: {
                    type: 'object',
                    additionalProperties: true,
                    properties: {
                      id: { type: 'integer' },
                      institucion: { type: 'object', additionalProperties: true },
                      domicilio: { type: 'object', additionalProperties: true },
                    },
                  },
                },
              },
              alumnoGrupos: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: true,
                  properties: {
                    id: { type: 'integer' },
                    grupo: {
                      type: 'object',
                      additionalProperties: true,
                      properties: {
                        id: { type: 'integer' },
                        grado: { type: 'object', additionalProperties: true },
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
  },
};

module.exports = findGroupAlumnosPersonaSchema;
