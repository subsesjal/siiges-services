const evaluacion = {
  programaId: { type: 'integer' },
  cumplimientoId: { type: 'integer' },
  evaluadorId: { type: 'integer' },
  estatus: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  porcentajeCumplimiento: { type: 'string' },
  valoracion: { type: 'string' },
  numero: { type: 'integer' },
};

module.exports = { evaluacion };
