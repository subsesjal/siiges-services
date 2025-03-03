// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  SolicitudBeca,
} = models;

const {
  createQuery,
  countQuery,
  findOneQuery,
  updateAndFindQuery,
  findAllQuery,
  deleteAndFindQuery,
} = queries;

module.exports = {
  createSolicitudBecaQuery: createQuery(SolicitudBeca),
  findOneSolicitudBecaQuery: findOneQuery(SolicitudBeca),
  countSolicitudesBecasQuery: countQuery(SolicitudBeca),
  updateSolicitudesBecasQuery: updateAndFindQuery(SolicitudBeca),
  findAllSolicitudesBecasQuery: findAllQuery(SolicitudBeca),
  deleteSolicitudBecasQuery: deleteAndFindQuery(SolicitudBeca),
  createSolicitudesBecasAlumnoQuery: createQuery(SolicitudBeca),
  findOneSolicitudesBecasAlumnoQuery: createQuery(SolicitudBeca),
};
