const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');
const { programaTurnos } = require('./properties/programaTurnos');
const { evaluacion } = require('../../evaluaciones/schema/properties/evaluacion');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { municipio } = require('../../usuarios/schema/properties/municipio');
const { responseProperties } = require('./properties/responseProperties');
const { institucion } = require('../../instituciones/schema/properties/institucion');

const findOneSolicitudProgramaSchema = {
  tags: ['Solicitudes'],
  description: 'Return an object solicitud - programa.',
  params: {
    title: 'findOneSolicitudProgramaSchema',
    type: 'object',
    properties: {
      solicitudId: { type: 'integer' },
    },
    required: ['solicitudId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitud,
            folio: { type: 'string' },
            ...responseProperties,
            estatusSolicitud: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...estatusSolicitud,
                ...responseProperties,
              },
            },
            programa: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
                ...responseProperties,
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
                evaluacion: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'integer' },
                    ...evaluacion,
                    ...responseProperties,
                  },
                },
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
                        municipio: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer' },
                            ...municipio,
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

module.exports = findOneSolicitudProgramaSchema;
