const findSolicitudRevEquivSchema = {
  type: 'object',
  description: 'Find solicitudRevEquiv by folio (query param).',
  querystring: {
    type: 'object',
    properties: {
      folioSolicitud: { type: 'string' },
    },
    required: ['folioSolicitud'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: ['object', 'null'] },
      },
    },
  },
};

module.exports = { findSolicitudRevEquivSchema };
