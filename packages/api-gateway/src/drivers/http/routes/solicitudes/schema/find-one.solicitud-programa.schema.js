const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { municipio } = require('../../usuarios/schema/properties/municipio');
const { responseProperties } = require('./properties/responseProperties');

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
                programaTurnos: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      turnoId: { type: 'integer' },
                      programaId: { type: 'integer' },
                    },
                  },
                },
                ...responseProperties,
                plantel: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...plantel,
                    ...responseProperties,
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
