const { solicitudesRevEquiv } = require('../../../adapters/db');

const createSolicitudRevEquiv = require('./create.solicitud-rev-equiv.use-cases');
const findOneSolicitudRevEquiv = require('./find-one.solicitud-rev-equiv.use-cases');
const findAllSolicitudesRevEquiv = require('./find-all.solicitudes-rev-equiv.use-cases');
const deleteSolicitudRevEquiv = require('./delete.solicitud-rev-equiv.use-cases');
const updateSolicitudRevEquiv = require('./update.solicitud-rev-equiv.use-cases');

module.exports = {
  createSolicitudRevEquiv: createSolicitudRevEquiv(
    solicitudesRevEquiv.createEquivalenciaQuery,
    solicitudesRevEquiv.createAsignaturaAntecedenteQuery,
    solicitudesRevEquiv.createAsignaturaEquivalenteQuery,
    solicitudesRevEquiv.createInstitucionDestinoQuery,
    solicitudesRevEquiv.createInstitucionProcedenciaQuery,
    solicitudesRevEquiv.createDomicilioEquivalenteQuery,
    solicitudesRevEquiv.createPersonaEquivalenteQuery,
    solicitudesRevEquiv.createInteresadoQuery,
  ),
  findOneSolicitudRevEquiv: findOneSolicitudRevEquiv(
    solicitudesRevEquiv.findOneSolicitudRevEquivQuery,
  ),
  findAllSolicitudesRevEquiv: findAllSolicitudesRevEquiv(
    solicitudesRevEquiv.findAllSolicitudesRevEquivQuery,
  ),
  deleteSolicitudRevEquiv: deleteSolicitudRevEquiv(
    solicitudesRevEquiv.deleteSolicitudRevEquivQuery,
  ),
  updateSolicitudRevEquiv: updateSolicitudRevEquiv(
    solicitudesRevEquiv.findOneSolicitudRevEquivQuery,
    solicitudesRevEquiv.updateSolicitudRevEquivQuery,
  ),
};
