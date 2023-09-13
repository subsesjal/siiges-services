// Alumno
const alumno = {
  personaId: { type: 'integer' },
  situacionId: { type: 'integer' },
  programaId: { type: 'integer' },
  matricula: { type: 'string' },
  estatus: { type: 'integer' },
  adeudoMaterias: { type: 'integer' },
  descripcionEstatus: { type: 'string' },
  archivoCertificado: { type: 'string' },
  archivoNacimiento: { type: 'string' },
  archivoCurp: { type: 'string' },
  estatusCertificado: { type: 'integer' },
  estatusNacimiento: { type: 'integer' },
  estatusCurp: { type: 'integer' },
  observaciones1: { type: 'string' },
  observaciones2: { type: 'string' },
  fechaBaja: { type: 'string', format: 'date-time' },
  alumnoTipoTramite: { type: 'integer' },
};

module.exports = { alumno };
