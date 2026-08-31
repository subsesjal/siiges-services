const findMunicipiosJaliscoSchema = {
  tags: ['RVOE Public'],
  description: 'Return a list of municipios from Jalisco.',
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

module.exports = findMunicipiosJaliscoSchema;
