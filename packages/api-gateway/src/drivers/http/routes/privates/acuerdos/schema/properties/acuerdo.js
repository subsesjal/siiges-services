const acuerdo = {
  organoColegiadoId: { type: 'integer' },
  numero: { type: 'string' },
  estatus: { type: 'string' },
  descripcion: { type: 'string' },
  descripcionSeguimiento: { type: 'string' },
  fecha: { type: 'string', format: 'date' },
};

module.exports = { acuerdo };
