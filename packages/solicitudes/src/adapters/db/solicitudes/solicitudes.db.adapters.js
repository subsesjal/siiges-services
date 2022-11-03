// External dependencies
const { models, queries } = require('@siiges-services/core');

const { Solicitud, Nivel } = models;

const {
  findOneQuery,
  createQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createSolicitudQuery: createQuery(Solicitud),
  updateAndFindSolicitudQuery: updateAndFindQuery(Solicitud),
  findOneSolicitudQuery: findOneQuery(Solicitud),
  findOneNivelQuery: findOneQuery(Nivel),
};
