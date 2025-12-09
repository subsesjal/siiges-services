const findSolicitudRevEquivSchema = {
  type: 'object',
  description: 'Consulta pública por folio',
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
