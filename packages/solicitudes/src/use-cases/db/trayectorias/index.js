const {
  solicitudes,
} = require('../../../adapters/db');

const createTrayectoriaPrograma = require('./create.trayectoria-programa.use-cases');

module.exports = {
  createTrayectoriaPrograma: createTrayectoriaPrograma(
    solicitudes.findOneProgramaQuery,
    solicitudes.findOneTrayectoriaQuery,
    solicitudes.createTrayectoriaQuery,
  ),
};
