const findAlumnosCountSchema = {
  tags: ['Alumnos'],
  description: 'Return the total number of Alumnos filtered by programa and situacion.',
  params: {
    title: 'findAlumnosCountSchema',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
    },
    required: ['programaId'],
  },
  querystring: {
    type: 'object',
    properties: {
      situacionId: { type: 'integer' },
    },
    required: ['situacionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            totalAlumnos: { type: 'integer' },
          },
        },
      },
    },
  },
};

module.exports = findAlumnosCountSchema;
