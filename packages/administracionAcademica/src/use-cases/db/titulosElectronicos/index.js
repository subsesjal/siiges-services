const { alumnos } = require('../../../adapters/db');

const { findAllTitulos } = require('./find-all.titulos.use-cases');

module.exports = {
  findAllTitulos: findAllTitulos(
    alumnos.findAllTitulosQuery,
  ),
};
