const {
  createSolicitudQuery,
} = require('../adapters/db');

const createSolicitud = require('./db/solicitudes/create.solicitud-programa.use-case');

module.exports = {
  createSolicitud: createSolicitud(createSolicitudQuery),
};
