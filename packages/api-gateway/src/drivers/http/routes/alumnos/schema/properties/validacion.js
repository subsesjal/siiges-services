const validacion = {
  alumnoId: { type: 'integer' },
  usuarioId: { type: 'integer' },
  estadoId: { type: 'integer' },
  nivelId: { type: 'integer' },
  tipoValidacionId: { type: 'integer' },
  situacionValidacionId: { type: 'integer' },
  folio: { type: 'string' },
  estatus: { type: 'string' },
  nombreInstitucionEmisora: { type: 'string' },
  claveCentroTrabajoEmisor: { type: 'string' },
  cedulaProfesional: { type: 'string' },
  archivoValidacion: { type: 'string' },
  fechaInicioAntecedente: { type: 'string', format: 'date-time' },
  fechaFinAntecedente: { type: 'string', format: 'date-time' },
  fechaExpedicion: { type: 'string', format: 'date-time' },
  fechaValidacion: { type: 'string', format: 'date-time' },
};

module.exports = { validacion };
