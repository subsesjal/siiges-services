const representante = {
  usaurioId: { type: 'integer' },
  solicitudId: { type: 'integer' },
};

const representanteCreateResponse = {
  ...representante,
  id: { type: 'integer' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
  deletedAt: { type: 'string', format: 'date-time' },
};

module.exports = {
  representante,
  representanteCreateResponse,
};
