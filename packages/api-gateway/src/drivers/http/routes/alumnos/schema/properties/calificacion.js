// Calificacion
const calificacion = {
  alumnoId: { type: 'integer' },
  grupoId: { type: 'integer' },
  asignaturaId: { type: 'integer' },
  calificacion: { type: 'integer' },
  tipo: { type: 'integer' },
  fechaExamen: { type: 'string', format: 'date' },
};

module.exports = { calificacion };
