const findMatriculaActivaSchema = {
  tags: ['Alumnos'],
  description: 'Regresa la matrícula activa agrupada por programa para una institución.',
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
          type: 'object',
          properties: {
            totalGeneral: { type: 'integer' },
            programas: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  programaId: { type: 'integer' },
                  programa: { type: 'string' },
                  acuerdoRvoe: { type: 'string' },
                  plantelId: { type: 'integer' },
                  plantel: { type: 'object' },
                  institucionId: { type: 'integer' },
                  institucion: { type: 'string' },
                  totalAlumnos: { type: 'integer' },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findMatriculaActivaSchema;
