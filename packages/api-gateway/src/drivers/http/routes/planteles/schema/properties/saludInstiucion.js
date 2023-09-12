const saludInstiucion = {
  plantelId: { type: 'integer' },
  nombre: { type: 'string' },
  tiempo: {
    type: 'string',
    pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
  },
};

module.exports = { saludInstiucion };
