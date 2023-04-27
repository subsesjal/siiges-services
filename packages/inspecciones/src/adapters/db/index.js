// External dependencies
const { drivers, queries } = require('@siiges-services/core');

const {
  Inspecciones,
} = drivers.sequelize.models;

const {
  createQuery,
} = queries;

module.exports = {
  createInspeccionesQuery: createQuery(Inspecciones),
};
