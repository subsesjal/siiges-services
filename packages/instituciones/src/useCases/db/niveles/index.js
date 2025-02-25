const {
  findAllNivelQuery,
} = require('../../../adapters/db');

const findAllNiveles = require('./find-all.niveles.use-case');

module.exports = {
  findAllNiveles: findAllNiveles(findAllNivelQuery),
};
