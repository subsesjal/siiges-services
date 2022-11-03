const {
  createSolicitudQuery,
  updateAndFindSolicitudQuery,
  findOneNivelQuery,
} = require('../adapters/db/solicitudes/solicitudes.db.adapters');

const createSolicitud = require('./db/solicitudes/create.solicitud-programa.use-cases');

module.exports = {
  createSolicitud: createSolicitud(
    createSolicitudQuery,
    findOneNivelQuery,
    updateAndFindSolicitudQuery,
  ),
};
