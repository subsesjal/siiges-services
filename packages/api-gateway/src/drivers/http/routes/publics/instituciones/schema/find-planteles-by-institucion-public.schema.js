const findPlantelesByInstitucionPublicSchema = {
  tags: ['Plantel Public'],
  description: 'Return a list of planteles by institucion (minimal data).',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
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
              domicilio: {
                type: 'object',
                properties: {
                  calle: { type: 'string' },
                  numeroExterior: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findPlantelesByInstitucionPublicSchema;
