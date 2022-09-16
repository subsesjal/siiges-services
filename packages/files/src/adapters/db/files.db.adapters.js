// Drivers
const { drivers, queries } = require('@siiges-services/core');

const { File } = drivers.sequelize.models;

const {
  findOneQuery,
  createQuery,
  findAndDeleteQuery,
  updateQuery,
} = queries;

module.exports = {
  findOneFileQuery: findOneQuery(File),
  createFileQuery: createQuery(File),
  updateFileQuery: updateQuery(File),
  deleteFileQuery: findAndDeleteQuery(File),
};
