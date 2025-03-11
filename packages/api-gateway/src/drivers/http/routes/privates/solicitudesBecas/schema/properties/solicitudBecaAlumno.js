// Solicitud Beca Alumno
const solicitudBecaAlumno = {
  solicitudBecaId: { type: 'integer' },
  estatusAlumnoBecaId: { type: 'integer' },
  tipoAlumnoBecaId: { type: 'integer' },
  alumnoId: { type: 'integer' },
  gradoId: { type: 'integer' },
  promedio: { type: 'number' },
  porcentajeBeca: { type: 'integer', minimum: 0, maximum: 100 },
};

module.exports = { solicitudBecaAlumno };
