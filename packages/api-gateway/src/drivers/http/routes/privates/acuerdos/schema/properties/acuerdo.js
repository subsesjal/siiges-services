const acuerdo = {
  organoColegiadoId: { type: 'integer' },
  numero: { type: 'string' },
  estatus: { type: 'string' },
  descripcion: { type: 'string' },
  descripcionSeguimiento: { type: 'string' },
  fecha: { type: 'string' }, // Cambio de date format
};

module.exports = { acuerdo };
