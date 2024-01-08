const { findVigilanciasByVigilante } = require('./findVigilanciasByVigilante');
const { findOneVigilante } = require('./find-one.handlers.vigilante.adapters');

module.exports = {
  findVigilanciasByVigilante,
  findOneVigilante,
};
