// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Solicitud,
  Nivel,
  Usuario,
} = models;

const {
  findAllQuery,
  findOneQuery,
  createQuery,
  updateAndFindQuery,
  countQuery,
  updateQuery,
} = queries;

module.exports = {
  createSolicitudProgramaQuery: createQuery(Solicitud),
  updateAndFindSolicitudQuery: updateAndFindQuery(Solicitud),
  findOneSolicitudQuery: findOneQuery(Solicitud),
  findOneNivelQuery: findOneQuery(Nivel),
  findOneUsuarioQuery: findOneQuery(Usuario),
  countSolicitudesQuery: countQuery(Solicitud),
  findAllSolicitudesProgramasQuery: findAllQuery(Solicitud),
  updateSolicitudQuery: updateQuery(Solicitud),
};
