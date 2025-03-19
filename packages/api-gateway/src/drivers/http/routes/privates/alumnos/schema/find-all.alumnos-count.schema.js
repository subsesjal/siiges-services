const findAlumnosCountSchema = {
  tags: ['Alumnos'],
  description: 'Regresa el total de los alumno dependiendo del programa y la situacion.',
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
