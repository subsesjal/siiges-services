// Vigilancia
const vigilancia = {
  programaId: { type: 'integer' },
  estatusVigilanciaId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  fechaAsignada: { type: 'string', format: 'date-time' },
  resutado: { type: 'string' },
  folio: { type: 'string' },
};

module.exports = { vigilancia };
