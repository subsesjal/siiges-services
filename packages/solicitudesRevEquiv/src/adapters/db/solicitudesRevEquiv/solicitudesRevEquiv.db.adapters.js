// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudRevEquiv,
  AsignaturaAntecedenteEquivalente,
} = models;

const {
  findAllQuery,
  findOneQuery,
  createQuery,
  updateAndFindQuery,
  deleteQuery,
} = queries;

module.exports = {
  // Create
  createSolicitudRevEquivQuery: createQuery(SolicitudRevEquiv),
  createAsignaturaAntecedenteEquivalente: createQuery(AsignaturaAntecedenteEquivalente),
  findOneSolicitudRevEquivQuery: findOneQuery(SolicitudRevEquiv),
  findAllSolicitudesRevEquivQuery: findAllQuery(SolicitudRevEquiv),
  deleteSolicitudRevEquivQuery: deleteQuery(SolicitudRevEquiv),
  updateSolicitudRevEquivQuery: updateAndFindQuery(SolicitudRevEquiv),
};
