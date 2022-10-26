// External dependencies
const { drivers, queries } = require('@siiges-services/core');

const { Solicitud } = drivers.sequelize.models;

const {
  createQuery,
} = queries;

module.exports = {
  createSolicitudQuery: createQuery(Solicitud),
};
