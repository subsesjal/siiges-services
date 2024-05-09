// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Solicitud,
} = models;

const {
  findOneQuery,
} = queries;

module.exports = {
  findOneSolicitudProgramaQuery: findOneQuery(Solicitud),
};
