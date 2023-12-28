const {
  vigilancias,
} = require('../../../adapters/db');

const findAllVigilanteVigilancias = require('./find-all.vigilante-vigilancias.use-cases');

module.exports = {
  findVigilanciasByVigilante: findAllVigilanteVigilancias(
    vigilancias.findAllVigilanteVigilanciaQuery,
  ),
};
