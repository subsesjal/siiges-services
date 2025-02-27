// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudServicioSocial,
  Domicilio,
  SolicitudServicioSocialAlumno,
  Alumno,
  Grado,
  ModalidadServicioSocial,
  SectorServicioSocial,
  EjeServicioSocial,
  DimensionServicioSocial,
} = models;

const {
  createQuery,
  countQuery,
  findOneQuery,
  findAllQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createSolicitudServicioSocialQuery: createQuery(SolicitudServicioSocial),
  findOneSolicitudServicioSocialQuery: findOneQuery(SolicitudServicioSocial),
  countSolicitudesServicioSocialQuery: countQuery(SolicitudServicioSocial),
  findAllSolicitudesServicioSocialQuery: findAllQuery(SolicitudServicioSocial),
  updateSolicitudServicioSocialQuery: updateAndFindQuery(SolicitudServicioSocial),
  updateDomicilioQuery: updateAndFindQuery(Domicilio),
  createSolicitudServicioSocialAlumnoQuery: createQuery(SolicitudServicioSocialAlumno),
  findOneSolicitudServicioSocialAlumnoQuery: findOneQuery(SolicitudServicioSocialAlumno),
  findOneAlumnoQuery: findOneQuery(Alumno),
  findOneGradoQuery: findOneQuery(Grado),
  findOneModalidadServicioSocialQuery: findOneQuery(ModalidadServicioSocial),
  findOneSectorServicioSocialQuery: findOneQuery(SectorServicioSocial),
  findOneEjeServicioSocialQuery: findOneQuery(EjeServicioSocial),
  findOneDimensionServicioSocialQuery: findOneQuery(DimensionServicioSocial),
};
