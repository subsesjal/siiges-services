// Drivers
const { drivers, queries } = require('@siiges-services/core');

const { File } = drivers.sequelize.models;

const {
  findOneQuery,
  createQuery,
  deleteQuery,
  updateQuery,
} = queries;

module.exports = {
  findOneFileQuery: findOneQuery(File),
  createFileQuery: createQuery(File),
  updateFileQuery: updateQuery(File),
  deleteFileQuery: deleteQuery(File),
};
