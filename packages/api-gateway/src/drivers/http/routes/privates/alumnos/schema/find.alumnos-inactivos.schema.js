const findAlumnosInactivosSchema = {
  tags: ['Alumnos'],
  description: 'Obtiene el listado de alumnos inactivos por institución.',
  querystring: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
      programaId: { type: 'integer' },
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
            additionalProperties: true,
            properties: {
              id: { type: 'integer' },
              matricula: { type: 'string' },
              situacionId: { type: 'integer' },
              nombreCompleto: { type: 'string' },
              curp: { type: ['string', 'null'] },
              fechaRegistro: { type: ['string', 'null'] },
              programaId: { type: 'integer' },
              programa: { type: 'string' },
              acuerdoRvoe: { type: ['string', 'null'] },
              plantelId: { type: 'integer' },
              plantel: { type: 'string' },
              institucionId: { type: 'integer' },
              institucion: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

module.exports = { findAlumnosInactivosSchema };
