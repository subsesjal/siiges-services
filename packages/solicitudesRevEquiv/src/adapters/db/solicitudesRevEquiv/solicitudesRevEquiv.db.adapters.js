// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudRevEquiv,
  AsignaturaAntecedenteEquivalente,
  AsignaturaEquivalentePrograma,
  InstitucionDestinoPrograma,
  Asignatura,
} = models;

const {
  findAllQuery,
  findOneQuery,
  createQuery,
  updateAndFindQuery,
  deleteQuery,
  countQuery,
} = queries;

module.exports = {
  // Create
  createSolicitudRevEquivQuery: createQuery(SolicitudRevEquiv),
  createAsignaturaAntecedenteEquivalente: createQuery(AsignaturaAntecedenteEquivalente),
  createAsignaturaEquivalenteProgramaQuery: createQuery(AsignaturaEquivalentePrograma),
  createInstitucionDestinoProgramaQuery: createQuery(InstitucionDestinoPrograma),
  findOneSolicitudRevEquivQuery: findOneQuery(SolicitudRevEquiv),
  findAllSolicitudesRevEquivQuery: findAllQuery(SolicitudRevEquiv),
  deleteSolicitudRevEquivQuery: deleteQuery(SolicitudRevEquiv),
  updateSolicitudRevEquivQuery: updateAndFindQuery(SolicitudRevEquiv),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
  findOneAsignaturaAntecedenteEquivalenteQuery: findOneQuery(AsignaturaAntecedenteEquivalente),
  countSolicitudRevEquivQuery: countQuery(SolicitudRevEquiv),
};
