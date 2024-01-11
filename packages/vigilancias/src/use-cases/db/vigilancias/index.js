const {
  vigilancias,
} = require('../../../adapters/db');

const findAllVigilanteVigilancias = require('./find-all.vigilante-vigilancias.use-cases');
const { findOneVigilante } = require('./find-one.vigilante.use-cases');
const { findAllPreguntas } = require('./find-all.preguntas.use-cases');

module.exports = {
  findVigilanciasByVigilante: findAllVigilanteVigilancias(
    vigilancias.findAllVigilanteVigilanciaQuery,
  ),
  findOneVigilante: findOneVigilante(
    vigilancias.findOneVigilanteQuery,
  ),
  findAllPreguntas: findAllPreguntas(
    vigilancias.findAllVigilanciaPreguntasQuery,
  ),

};
