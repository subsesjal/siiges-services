const createQuery = require('./create.adapters');
const deleteAndFindQuery = require('./delete.db.adapters');
const findOneQuery = require('./find-one.db.adapter');
const findAllQuery = require('./find-all.db.adapter');
const updateQueryModule = require('./update.db.adapters');
const countQuery = require('./count.db.adapter');

module.exports = {
  ...updateQueryModule,
  ...deleteAndFindQuery,
  createQuery,
  findOneQuery,
  findAllQuery,
  countQuery,
};
