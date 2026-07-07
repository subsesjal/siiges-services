const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { validacion } = require('./properties/validacion');
const { situacionesValidacion } = require('./properties/situacionValidacion');
const { tipoValidaciones } = require('./properties/tipoValidacion');
const { estado } = require('../../usuarios/schema/properties/estado');
const { nivel } = require('../../grupos/schema/properties/nivel');
const { programa } = require('../../programas/schema/properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('./properties/responseProperties');

const findAlumnosInactivosSchema = {
  tags: ['Alumnos'],
  description: 'Obtiene el listado de alumnos inactivos por institución.',
  querystring: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
      programaId: { type: 'integer' },
    },
    required: ['institucionId'],
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
                properties: {
                  ...persona,
                  ...responseProperties,
                },
              },
              programa: {
                type: 'object',
                properties: {
                  ...programa,
                  acuerdoRvoe: { type: ['string', 'null'] },
                  plantelId: { type: 'integer' },
                  ...responseProperties,
                  plantel: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...plantel,
                      ...responseProperties,
                      institucion: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          ...institucion,
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
                    },
                  },
                },
              },
              validacion: {
                type: ['object', 'null'],
                properties: {
                  id: { type: 'integer' },
                  ...validacion,
                  ...responseProperties,
                  tipo: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...tipoValidaciones,
                      ...responseProperties,
                    },
                  },
                  situacionValidacion: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...situacionesValidacion,
                      ...responseProperties,
                    },
                  },
                  estado: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...estado,
                      ...responseProperties,
                    },
                  },
                  nivel: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...nivel,
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

module.exports = { findAlumnosInactivosSchema };
