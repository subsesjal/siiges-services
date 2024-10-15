const {
  findAllEstadosQuery,
} = require('../../../adapters/db');

const findAllEstados = require('./find-all.estados.use-cases');

module.exports = {
  findAllEstados: findAllEstados(findAllEstadosQuery),
};
