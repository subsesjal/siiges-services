const {
  createQuery,
  createUserUsersQuery,
  findAllQuery,
  findAllUserUsersQuery,
  findOneQuery,
  deleteQuery,
  updateQuery,
} = require('../adapters/db');

const findOneUser = require('./db/find-one.users.use-cases');
const findAllUsers = require('./db/find-all.users.use-cases');
const findAllUserUsers = require('./db/find-all.user-users.use-cases');
const createUser = require('./db/create.users.use-cases');
const createUserUser = require('./db/create.user-user.use-casesy');
const deleteUser = require('./db/delete.users.use-cases');
const updateUser = require('./db/update.users.use-cases');
const findOneUserDetail = require('./db/find-one.users-detail.use-cases');

module.exports = {
  findAllUsers: findAllUsers(findAllQuery),
  findAllUserUsers: findAllUserUsers(findAllUserUsersQuery, findOneQuery),
  findOneUser: findOneUser(findOneQuery),
  findOneUserDetail: findOneUserDetail(findOneQuery),
  createUser: createUser(createQuery),
  createUserUser: createUserUser(createUserUsersQuery, createQuery, findOneQuery),
  updateUser: updateUser(updateQuery),
  deleteUser: deleteUser(deleteQuery),
};
