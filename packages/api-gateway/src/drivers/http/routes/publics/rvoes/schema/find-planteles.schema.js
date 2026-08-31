const findPlantelesByInstitucionSchema = {
  tags: ['RVOE Public'],
  description: 'Return a list of planteles, optionally filtered by institucion and/or municipio.',
  querystring: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
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
              claveCentroTrabajo: { type: 'string' },
              nombreInstitucion: { type: 'string' },
              calle: { type: 'string' },
              numeroExterior: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

module.exports = findPlantelesByInstitucionSchema;
