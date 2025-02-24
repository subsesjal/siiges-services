// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudServicioSocial,
  Domicilio,
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
};
