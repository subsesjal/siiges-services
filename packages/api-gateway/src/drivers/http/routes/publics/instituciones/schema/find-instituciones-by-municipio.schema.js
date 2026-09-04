const findInstitucionesByMunicipioSchema = {
  tags: ['Institucion Public'],
  description: 'Return a list of instituciones by municipio (minimal data).',
  querystring: {
    type: 'object',
    required: ['municipioId'],
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
