const createQuery = require('./create.adapters');
const deleteModule = require('./delete.db.adapters');
const findOneQuery = require('./find-one.db.adapter');
const findAllQuery = require('./find-all.db.adapter');
const updateModule = require('./update.db.adapters');

module.exports = {
  ...deleteModule,
  ...updateModule,
  createQuery,
  findOneQuery,
  findAllQuery,
};
