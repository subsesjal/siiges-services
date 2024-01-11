const { findVigilanciasByVigilante } = require('./findVigilanciasByVigilante');
const { findOneVigilante } = require('./find-one.handlers.vigilante.adapters');
const { findAllPreguntas } = require('./find-all.handlers.preguntas.adapters');

module.exports = {
  findVigilanciasByVigilante,
  findOneVigilante,
  findAllPreguntas,
};
