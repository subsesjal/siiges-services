const {
  solicitudesFolios,
} = require('../../../adapters/db');

const createSolicitudFolio = require('./create.solicitud-folio.use-cases');
const findOneSolicitudFolio = require('./find-one.solicitud-folio.use-cases');
const findAllSolicitudesFolios = require('./find-all.solicitudes-folios.use-cases');
const updateSolicitudFolio = require('./update.solicitud-folio.use-cases');
const createFirmaCertificado = require('./create.firma-certificado.solicitud-folio.use-cases');

module.exports = {
  createSolicitudFolio: createSolicitudFolio(
    solicitudesFolios.createSolicitudFolioQuery,
    solicitudesFolios.countSolicitudesFoliosQuery,
  ),
  updateSolicitudFolio: updateSolicitudFolio(
    solicitudesFolios.findOneSolicitudFolioQuery,
    solicitudesFolios.updateSolicitudFolioQuery,
  ),
  findAllSolicitudesFolios: findAllSolicitudesFolios(
    solicitudesFolios.findAllSolicitudesFoliosQuery,
  ),
  findOneSolicitudFolio: findOneSolicitudFolio(
    solicitudesFolios.findOneSolicitudFolioQuery,
  ),
  createFirmaCertificado: createFirmaCertificado(
    solicitudesFolios.findOneCatalogoFirmaElectronicaQuery,
    solicitudesFolios.findOneTokenExternoQuery,
    solicitudesFolios.createTokenExternoQuery,
    solicitudesFolios.updateTokenExternoQuery,
    solicitudesFolios.createDocumentoFirmadoQuery,
    solicitudesFolios.updateDocumentoFirmadoQuery,
  ),
};
