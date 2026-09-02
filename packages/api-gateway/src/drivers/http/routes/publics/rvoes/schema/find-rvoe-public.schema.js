const findRvoePublicSchema = {
  tags: ['RVOE Public'],
  description: 'Search RVOEs by plantel.',
  querystring: {
    type: 'object',
    required: ['plantelId'],
    properties: {
      plantelId: { type: 'integer' },
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
              nivel: { type: 'string' },
              nombrePrograma: { type: 'string' },
              acuerdoRvoe: { type: 'string' },
              fechaCreacion: { type: 'string' },
              municipio: { type: 'string' },
              vigencia: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

module.exports = findRvoePublicSchema;
