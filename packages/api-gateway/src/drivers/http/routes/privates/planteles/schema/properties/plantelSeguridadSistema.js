// Plantel Seguridad Sistema
const plantelSeguridadSistema = {
  plantelId: { type: 'integer' },
  seguridadSistemaId: {
    type: 'integer',
    minimum: 1,
    maximum: 8,
  },
  cantidad: { type: 'string' },
};

module.exports = { plantelSeguridadSistema };
