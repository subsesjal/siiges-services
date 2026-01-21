// AlumnoGrupo
const alumnoGrupo = {
  alumnoId: { type: 'integer' },
  grupoId: { type: 'integer' },
  periodoFechaInicio: { type: 'string' }, // Cambio de date format
  periodoFechaFin: { type: 'string' }, // Cambio de date format
};

module.exports = { alumnoGrupo };
