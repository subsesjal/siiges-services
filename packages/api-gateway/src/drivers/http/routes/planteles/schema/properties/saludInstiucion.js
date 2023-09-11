const saludInstiucion = {
  plantelId: { type: 'integer' },
  nombre: { type: 'string' },
  tiempo: {
    type: 'string',
    format: 'date-time',
  },
};

module.exports = { saludInstiucion };
