const {
  createQuery,
  createUserUsersQuery,
  createDomicilioQuery,
  findAllQuery,
  findAllUserUsersQuery,
  findOneUserQuery,
  deleteQuery,
  updateUserQuery,
  updatePersonaQuery,
  updateDomicilioQuery,
} = require('../../adapters/db');

const findOneUser = require('./db/find-one.users.use-cases');
const findAllUsers = require('./db/find-all.users.use-cases');
const findAllUserUsers = require('./db/find-all.user-users.use-cases');
const createUser = require('./db/create.users.use-cases');
const createUserUser = require('./db/create.user-user.use-cases');
const deleteUser = require('./db/delete.users.use-cases');
const updateUser = require('./db/update.users.use-cases');
const findOneUserDetail = require('./db/find-one.users-detail.use-cases');

module.exports = {
  findAllUsers: findAllUsers(findAllQuery),
  findAllUserUsers: findAllUserUsers(findAllUserUsersQuery, findOneUserQuery),
  findOneUser: findOneUser(findOneUserQuery),
  findOneUserDetail: findOneUserDetail(findOneUserQuery),
  createUser: createUser(createQuery, findOneUserQuery),
  createUserUser: createUserUser(createUserUsersQuery, createQuery, findOneUserQuery),
  updateUser: updateUser(
    findOneUserQuery,
    updateUserQuery,
    updatePersonaQuery,
    updateDomicilioQuery,
    createDomicilioQuery,
  ),
  deleteUser: deleteUser(deleteQuery),
};
