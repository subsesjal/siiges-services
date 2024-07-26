const { responseProperties } = require('./responseProperties');

const persona = {
  nombre: { type: 'string' },
  apellidoPaterno: { type: 'string' },
  apellidoMaterno: { type: 'string' },
  ...responseProperties,
};

module.exports = { persona };
