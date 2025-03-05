// Solicitud Beca Alumno
const solicitudBecaAlumno = {
  solicitudBecaId: { type: 'integer' },
  estatusAlumnoBecaId: { type: 'integer' },
  tipoAlumnoBecaId: { type: 'integer' },
  alumnoId: { type: 'integer' },
  gradoId: { type: 'integer' },
  promedio: { type: 'integer' },
  porcentajeBeca: { type: 'integer' },
};

module.exports = { solicitudBecaAlumno };
