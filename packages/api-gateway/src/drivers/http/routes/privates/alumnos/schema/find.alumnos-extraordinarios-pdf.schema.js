const findAlumnosExtraordinariosPdfSchema = {
  tags: ['Alumnos'],
  description: 'Obtiene el reporte en PDF de alumnos extraordinarios por institución.',
  querystring: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
      programaId: { type: 'integer' },
      cicloEscolarId: { type: 'integer' },
    },
    required: ['institucionId', 'cicloEscolarId'],
  },
};

module.exports = { findAlumnosExtraordinariosPdfSchema };
