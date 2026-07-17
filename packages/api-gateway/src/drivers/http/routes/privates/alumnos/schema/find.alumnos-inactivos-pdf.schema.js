const findAlumnosInactivosPdfSchema = {
  tags: ['Alumnos'],
  description: 'Obtiene el reporte en PDF de alumnos inactivos por institución.',
  querystring: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
      programaId: { type: 'integer' },
    },
    required: ['institucionId'],
  },
};

module.exports = { findAlumnosInactivosPdfSchema };
