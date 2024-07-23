const {
  solicitudesFolios,
} = require('../../../adapters/db');

const createSolicitudFolio = require('./create.solicitud-folio.use-cases');
const findOneSolicitudFolio = require('./find-one.solicitud-programa.use-cases');
const findAllSolicitudesFolios = require('./find-all.solicitudes-folios.use-cases');

module.exports = {
  createSolicitudFolio: createSolicitudFolio(
    solicitudesFolios.createSolicitudFolioQuery,
    solicitudesFolios.countSolicitudesFoliosQuery,
  ),
  findAllSolicitudesFolios: findAllSolicitudesFolios(
    solicitudesFolios.findAllSolicitudesFoliosQuery,
  ),
  findOneSolicitudFolio: findOneSolicitudFolio(
    solicitudesFolios.findOneSolicitudFolioQuery,
  ),

};
