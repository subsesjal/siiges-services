const createSolicitudRevEquiv = require('./create.handlers.solicitud-rev-equiv.adapters');
const findOneSolicitudRevEquiv = require('./find-one.handlers.solicitud-rev-equiv.adapters');
const findAllSolicitudesRevEquiv = require('./find-all.handlers.solicitudes-rev-equiv.adapters');
const deleteSolicitudRevEquiv = require('./delete.handlers.solicitud-rev-equiv.adapters');
const updateSolicitudRevEquiv = require('./update.handlers.solicitud-rev-equiv.adapters');
const createAsignaturaAntecedenteEquivalente = require('./create.handlers.asignatura-antecedente-equivalente.adapter');
const findOneAsignaturaAntecedenteEquivalente = require('./find-one.handlers.asignatura-antecedente-equivalente.adapters');
const processSolicitudRevEquiv = require('./process.handlers.solicitud-rev-equiv.adapters');
const findSolicitudRevEquivByFolio = require('./find-one.handlers.solicitud-rev-equiv-folio.adapters');

module.exports = {
  createSolicitudRevEquiv,
  findOneSolicitudRevEquiv,
  findAllSolicitudesRevEquiv,
  deleteSolicitudRevEquiv,
  updateSolicitudRevEquiv,
  createAsignaturaAntecedenteEquivalente,
  findOneAsignaturaAntecedenteEquivalente,
  processSolicitudRevEquiv,
  findSolicitudRevEquivByFolio,
};
