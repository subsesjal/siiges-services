const { equivalencia } = require('./properties/equivalenciaProperties');
const { responseProperties } = require('./properties/responseProperties');

const updateEquivalenciaSchema = {
  type: 'object',
  description: 'update a equivalencia.',
  body: {
    type: 'object',
    properties: {
      tipoTramiteId: { type: 'integer' },
      estatusSolicitudRevEquivId: { type: 'integer' },
      fecha: { type: 'string', format: 'date' },
      folioSolicitud: { type: 'string' },
      observaciones: { type: 'string' },
    },
    required: [
      'tipoTramiteId',
      'estatusSolicitudRevEquivId',
      'fecha',
      'folioSolicitud',
      'observaciones',
    ],
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
          },
        },
      },
    },
  },
};

module.exports = updateEquivalenciaSchema;
