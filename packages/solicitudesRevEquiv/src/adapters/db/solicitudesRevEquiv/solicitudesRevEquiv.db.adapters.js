// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudRevEquiv,
  InstitucionProcedencia,
  InstitucionDestino,
  Domicilio,
  Persona,
  Interesado,
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
  createInstitucionProcedenciaQuery: createQuery(InstitucionProcedencia),
  createInstitucionDestinoQuery: createQuery(InstitucionDestino),
  createDomicilioEquivalenteQuery: createQuery(Domicilio),
  createPersonaEquivalenteQuery: createQuery(Persona),
  createInteresadoQuery: createQuery(Interesado),
  findOneSolicitudRevEquivQuery: findOneQuery(SolicitudRevEquiv),
  findAllSolicitudesRevEquivQuery: findAllQuery(SolicitudRevEquiv),
  deleteSolicitudRevEquivQuery: deleteQuery(SolicitudRevEquiv),
  updateSolicitudRevEquivQuery: updateAndFindQuery(SolicitudRevEquiv),
};
