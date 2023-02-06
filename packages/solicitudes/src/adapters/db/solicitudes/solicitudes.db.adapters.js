// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Solicitud,
  Nivel,
  Usuario,
} = models;

const {
  findOneQuery,
  createQuery,
  updateAndFindQuery,
  countQuery,
} = queries;

module.exports = {
  createSolicitudProgramaQuery: createQuery(Solicitud),
  updateAndFindSolicitudQuery: updateAndFindQuery(Solicitud),
  findOneSolicitudQuery: findOneQuery(Solicitud),
  findOneNivelQuery: findOneQuery(Nivel),
  findOneUsuarioQuery: findOneQuery(Usuario),
  countSolicitudesQuery: countQuery(Solicitud),
};
