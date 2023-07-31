const {
  solicitudes,
} = require('../../../adapters/db');

const createTrayectoriaPrograma = require('./create.trayectoria-programa.use-cases');
const findOneTrayectoriaPrograma = require('./find-one.trayectoria-programa.use-cases');
const updateTrayectoriaPrograma = require('./update.trayectoria-programa.use-cases');

module.exports = {
  createTrayectoriaPrograma: createTrayectoriaPrograma(
    solicitudes.findOneProgramaQuery,
    solicitudes.findOneTrayectoriaQuery,
    solicitudes.createTrayectoriaQuery,
  ),
  findOneTrayectoriaPrograma: findOneTrayectoriaPrograma(
    solicitudes.findOneTrayectoriaQuery,
  ),
  updateTrayectoriaPrograma: updateTrayectoriaPrograma(
    solicitudes.findOneTrayectoriaQuery,
    solicitudes.updateTrayectoriaQuery,
  ),
};
