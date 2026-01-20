const { solicitudesRevEquiv } = require('../../../adapters/db');

const createSolicitudRevEquiv = require('./create.solicitud-rev-equiv.use-cases');
const findOneSolicitudRevEquiv = require('./find-one.solicitud-rev-equiv.use-cases');
const findAllSolicitudesRevEquiv = require('./find-all.solicitudes-rev-equiv.use-cases');
const deleteSolicitudRevEquiv = require('./delete.solicitud-rev-equiv.use-cases');
const updateSolicitudRevEquiv = require('./update.solicitud-rev-equiv.use-cases');
const createAsignaturaAntecedenteEquivalente = require('./create.asignatura-antecedente-equivalente.use-cases');
const findOneAsignaturaAntecedenteEquivalente = require('./find-one.asignatura-antecedente-equivalente.use-cases');
const processSolicitudRevEquiv = require('./process.solicitud-rev-equiv.use-cases');
const deleteAsignaturaAntecedenteEquivalente = require('./delete.asignatura-antecedente-equivalente.use-cases');
const updateAsignaturaAntecedenteEquivalente = require('./update.asignatura-antecedente-equivalente.use-cases');

module.exports = {
  createSolicitudRevEquiv: createSolicitudRevEquiv(
    solicitudesRevEquiv.createSolicitudRevEquivQuery,
    solicitudesRevEquiv.createAsignaturaAntecedenteEquivalente,
    solicitudesRevEquiv.findOneSolicitudRevEquivQuery,
    solicitudesRevEquiv.createAsignaturaEquivalenteProgramaQuery,
    solicitudesRevEquiv.createInstitucionDestinoProgramaQuery,
    solicitudesRevEquiv.countSolicitudRevEquivQuery,
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
  createAsignaturaAntecedenteEquivalente: createAsignaturaAntecedenteEquivalente(
    solicitudesRevEquiv.createAsignaturaAntecedenteEquivalente,
    solicitudesRevEquiv.createAsignaturaEquivalenteProgramaQuery,
    solicitudesRevEquiv.findOneAsignaturaQuery,
  ),
  findOneAsignaturaAntecedenteEquivalente: findOneAsignaturaAntecedenteEquivalente(
    solicitudesRevEquiv.findOneAsignaturaAntecedenteEquivalenteQuery,
  ),
  deleteAsignaturaAntecedenteEquivalente: deleteAsignaturaAntecedenteEquivalente(
    solicitudesRevEquiv.deleteAsignaturaAntecedenteEquivalenteQuery,
  ),
  updateAsignaturaAntecedenteEquivalente: updateAsignaturaAntecedenteEquivalente(
    solicitudesRevEquiv.updateAsignaturaAntecedenteEquivalente,
    solicitudesRevEquiv.findOneAsignaturaAntecedenteEquivalenteQuery,
    solicitudesRevEquiv.updateAsignaturaEquivalenteProgramaQuery,
    solicitudesRevEquiv.findOneAsignaturaEquivalenteProgramaQuery,
  ),
  processSolicitudRevEquiv: processSolicitudRevEquiv(
    solicitudesRevEquiv.findOneSolicitudRevEquivQuery,
    solicitudesRevEquiv.findOneAlumnoQuery,
    solicitudesRevEquiv.createAlumnoQuery,
    solicitudesRevEquiv.findOneCicloEscolarQuery,
    solicitudesRevEquiv.createCicloEscolarQuery,
    solicitudesRevEquiv.findOneGrupoQuery,
    solicitudesRevEquiv.createGrupoQuery,
    solicitudesRevEquiv.findOneAlumnoGrupoQuery,
    solicitudesRevEquiv.createAlumnoGrupoQuery,
    solicitudesRevEquiv.findOneCalificacionQuery,
    solicitudesRevEquiv.createCalificacionQuery,
    solicitudesRevEquiv.findOneEquivQuery,
    solicitudesRevEquiv.createEquiQuery,
  ),
};
