const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');
const { estatusSolicitud } = require('./properties/estatusSolicitud');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { municipio } = require('../../usuarios/schema/properties/municipio');
const { responseProperties } = require('./properties/responseProperties');

const findOneSolicitudesProgramasSchema = {
  tags: ['Solicitudes'],
  description: 'Return a list of solicitudes.',
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
              ...solicitud,
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
  },
};

module.exports = findOneSolicitudesProgramasSchema;
