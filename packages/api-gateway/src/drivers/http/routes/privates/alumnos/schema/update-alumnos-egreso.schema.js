const updateAlumnosEgresoSchema = {
  tags: ['Alumnos'],
  description: 'Given an array of alumnoIds, marks as Egresado (3) those who meet the graduation requirements and reports which could and could not be graduated.',
  body: {
    type: 'object',
    properties: {
      alumnoIds: {
        type: 'array',
        items: { type: 'integer' },
        minItems: 1,
      },
    },
    required: ['alumnoIds'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            egresados: { type: 'array', items: { type: 'integer' } },
            noEgresados: { type: 'array', items: { type: 'integer' } },
            totalEgresados: { type: 'integer' },
            totalNoEgresados: { type: 'integer' },
          },
        },
      },
    },
  },
};

module.exports = { updateAlumnosEgresoSchema };
