const { solicitudesServSoc } = require('../../../adapters/db');

const createSolicitudServSoc = require('./create.solicitud-serv-soc.use-cases');
const findOneSolicitudServSoc = require('./find-one.solicitud-serv-soc.use-cases');
const findAllSolicitudesServSoc = require('./find-all.solicitudes-serv-soc.use-cases');
const updateSolicitudServSoc = require('./update.solicitud-serv-soc.use-cases');
const deleteSolicitudServSoc = require('./delete.solicitud-serv-soc-use-cases');

module.exports = {
  createSolicitudServSoc: createSolicitudServSoc(
    solicitudesServSoc.createSolicitudServicioSocialQuery,
    solicitudesServSoc.countSolicitudesServicioSocialQuery,
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
  ),
  findOneSolicitudServSoc: findOneSolicitudServSoc(
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
  ),
  findAllSolicitudesServSoc: findAllSolicitudesServSoc(
    solicitudesServSoc.findAllSolicitudesServicioSocialQuery,
  ),
  updateSolicitudServSoc: updateSolicitudServSoc(
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
    solicitudesServSoc.updateSolicitudServicioSocialQuery,
    solicitudesServSoc.updateDomicilioQuery,
  ),
  deleteSolicitudServSoc: deleteSolicitudServSoc(
    solicitudesServSoc.findOneSolicitudServicioSocialQuery,
    solicitudesServSoc.deleteSolicitudesServicioSocialQuery,
  ),
};
