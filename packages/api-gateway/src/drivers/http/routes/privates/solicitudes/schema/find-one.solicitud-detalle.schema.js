const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');
const { programaTurnos } = require('./properties/programaTurnos');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { responseProperties } = require('./properties/responseProperties');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { municipio } = require('../../usuarios/schema/properties/municipio');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { ratificacionNombre } = require('../../instituciones/schema/properties/ratificacionNombre');
const { trayectoria } = require('../../trayectorias/schema/properties/trayectoria');
const { rector } = require('../../instituciones/schema/properties/rector');
const { persona } = require('../../usuarios/schema/properties/persona');

const findOneSolicitudDetalleSchema = {
  tags: ['Solicitudes'],
  description: 'Return an object solicitud with all the details.',
  params: {
    title: 'findOneSolicitudDetalleSchema',
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
                trayectoria: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'integer' },
                    ...trayectoria,
                    ...responseProperties,
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
                    institucion: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...institucion,
                        ...responseProperties,
                        ratificacionesNombre: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              ...ratificacionNombre,
                              ...responseProperties,
                            },
                          },
                        },
                        rector: {
                          if: {
                            type: 'object',
                          },
                          then: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              ...rector,
                              ...responseProperties,
                              persona: {
                                type: 'object',
                                properties: {
                                  id: { type: 'integer' },
                                  ...persona,
                                  ...responseProperties,
                                },
                              },
                            },
                          },
                          else: {
                            type: 'object',
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

module.exports = findOneSolicitudDetalleSchema;
