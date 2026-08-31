const findInstitucionesByMunicipioSchema = {
  tags: ['RVOE Public'],
  description: 'Return a list of instituciones, optionally filtered by municipio.',
  querystring: {
    type: 'object',
    properties: {
      municipioId: { type: 'integer' },
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
              nombre: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

module.exports = findInstitucionesByMunicipioSchema;
