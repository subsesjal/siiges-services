const {
  findAllPaisesQuery,
} = require('../../../adapters/db');

const findAllPaises = require('./find-all.paises.use-case');

module.exports = {
  findAllPaises: findAllPaises(findAllPaisesQuery),
};
