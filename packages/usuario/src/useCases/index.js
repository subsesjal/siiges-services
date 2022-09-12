const {
  createQuery,
  findAllQuery,
  findOneQuery,
  deleteQuery,
  updateQuery,
} = require('../adapters/db');

const findOneUser = require('./db/find-one.users.use-cases');
const findAllUsers = require('./db/find-all.users.use-cases');
const createUser = require('./db/create.users.use-cases');
const deleteUser = require('./db/delete.users.use-cases');
const updateUser = require('./db/update.users.use-cases');

module.exports = {
  findAllUsers: findAllUsers(findAllQuery),
  findOneUser: findOneUser(findOneQuery),
  createUser: createUser(createQuery),
  updateUser: updateUser(updateQuery),
  deleteUser: deleteUser(deleteQuery),
};
