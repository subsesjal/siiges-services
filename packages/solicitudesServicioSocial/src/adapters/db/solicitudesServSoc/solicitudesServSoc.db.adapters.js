// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudServicioSocial,
} = models;

const {
  createQuery,
  countQuery,
  findOneQuery,
  findAllQuery,
} = queries;

module.exports = {
  createSolicitudServicioSocialQuery: createQuery(SolicitudServicioSocial),
  findOneSolicitudServicioSocialQuery: findOneQuery(SolicitudServicioSocial),
  countSolicitudesServicioSocialQuery: countQuery(SolicitudServicioSocial),
  findAllSolicitudesServicioSocialQuery: findAllQuery(SolicitudServicioSocial),
};
