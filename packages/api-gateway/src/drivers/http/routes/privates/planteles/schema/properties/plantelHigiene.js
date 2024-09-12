// Plantel Higiene
const plantelHigiene = {
  plantelId: { type: 'integer' },
  higieneId: {
    type: 'integer',
    minimum: 1,
    maximum: 11,
  },
  cantidad: { type: 'string' },
};

module.exports = { plantelHigiene };
