const { solicitudFolio } = require('./properties/solicitudFolio');
const { tipoDocumento } = require('./properties/tipoDocumento');
const { tipoSolicitudFolio } = require('./properties/tipoSolicitudFolio');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { estatusSolicitudFolio } = require('./properties/estatusSolicitudFolio');
const { responseProperties } = require('./properties/responseProperties');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { municipio } = require('../../usuarios/schema/properties/municipio');

const findAllSolicitudesProgramasSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Return a list of solicitudes.',
  querystring: {
    estatusSolicitudFolioId: {
      type: 'string',
    },
    tipoDocumentoId: {
      type: 'string',
    },
    tipoSolicitudFolioId: {
      type: 'string',
    },
    programaId: {
      type: 'string',
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
              ...solicitudFolio,
              ...responseProperties,
              estatusSolicitudFolio: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...estatusSolicitudFolio,
                  ...responseProperties,
                },
              },
              tipoDocumento: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...tipoDocumento,
                  ...responseProperties,
                },
              },
              tipoSolicitudFolio: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...tipoSolicitudFolio,
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
                      institucion: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          ...institucion,
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
};

module.exports = findAllSolicitudesProgramasSchema;
