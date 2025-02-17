const { solicitudesServSoc } = require('../../../adapters/db');

const createSolicitudServSoc = require('./create.solicitud-serv-soc.use-cases');

module.exports = {
  createSolicitudServSoc: createSolicitudServSoc(
    solicitudesServSoc.createSolicitudServicioSocialQuery,
    solicitudesServSoc.countSolicitudesServicioSocialQuery,
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
  ),
};
