// Docente
const docente = {
  personaId: { type: 'integer' },
  programaId: { type: 'integer' },
  esAceptado: { type: 'boolean' },
  tipoDocente: { type: 'integer' },
  tipoContratacion: { type: 'integer' },
  antiguedad: { type: 'string' },
  experiencias: { type: 'string' },
  observaciones: { type: 'string' },
};

module.exports = { docente };
