const {
  solicitudes,
} = require('../../../adapters/db');

const createSolicitudPrograma = require('./create.solicitud-programa.use-cases');

module.exports = {
  createSolicitudPrograma: createSolicitudPrograma(
    solicitudes.findOneUsuarioQuery,
    solicitudes.countSolicitudesQuery,
    solicitudes.createSolicitudProgramaQuery,
  ),
};
