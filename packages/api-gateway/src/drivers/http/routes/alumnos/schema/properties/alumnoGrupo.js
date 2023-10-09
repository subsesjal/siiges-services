// AlumnoGrupo
const alumnoGrupo = {
  alumnoId: { type: 'integer' },
  grupoId: { type: 'integer' },
  periodoFechaInicio: {
    type: 'string',
    format: 'date',
  },
  periodoFechaFin: {
    type: 'string',
    format: 'date',
  },
};

module.exports = { alumnoGrupo };
