const createQuery = require('./create.adapters');
const deleteQuery = require('./delete.db.adapters');
const findOneQuery = require('./find-one.db.adapter');
const findAllQuery = require('./find-all.db.adapter');
const { updateQuery } = require('./update.db.adapters');

module.exports = {
  deleteQuery,
  updateQuery,
  createQuery,
  findOneQuery,
  findAllQuery,
};
