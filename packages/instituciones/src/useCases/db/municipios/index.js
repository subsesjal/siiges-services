const {
  findAllMunicipiosQuery,
} = require('../../../adapters/db');

const findAllMunicipios = require('./find-all.municipios.use-cases');

module.exports = {
  findAllMunicipios: findAllMunicipios(findAllMunicipiosQuery),
};
