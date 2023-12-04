// Vigilancia
const vigilancia = {
  programaId: { type: 'integer' },
  estatusVigilanciaId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  folio: { type: 'string' },
};

module.exports = { vigilancia };
