// Calificacion
const calificacion = {
  alumnoId: { type: 'integer' },
  grupoId: { type: 'integer' },
  asignaturaId: { type: 'integer' },
  calificacion: { type: 'string' },
  tipo: { type: 'integer' },
  fechaExamen: { type: 'string' }, // Cambio de date format
};

module.exports = { calificacion };
