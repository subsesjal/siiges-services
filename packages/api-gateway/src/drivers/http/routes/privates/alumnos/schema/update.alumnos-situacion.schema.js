const updateAlumnosSituacionSchema = {
  tags: ['Alumnos'],
  description: 'Given an array of alumnoIds, activates those whose situacionValidacionId is Auténtico (1) and reports which could and could not be activated.',
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
            activados: { type: 'array', items: { type: 'integer' } },
            noActivados: { type: 'array', items: { type: 'integer' } },
            totalActivados: { type: 'integer' },
            totalNoActivados: { type: 'integer' },
          },
        },
      },
    },
  },
};

module.exports = { updateAlumnosSituacionSchema };
