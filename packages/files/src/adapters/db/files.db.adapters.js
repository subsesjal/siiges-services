// Drivers
const { drivers, queries } = require('@siiges-services/core');

const { File } = drivers.sequelize.models;

const {
  findOneQuery,
  createQuery,
  deleteAndFindQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneFileQuery: findOneQuery(File),
  createFileQuery: createQuery(File),
  updateFileQuery: updateAndFindQuery(File),
  deleteFileQuery: deleteAndFindQuery(File),
};
