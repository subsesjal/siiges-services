const adapters = require('../../adapters/db');

const findOneUser = require('./db/find-one.users.use-cases');
const findAllUsers = require('./db/find-all.users.use-cases');
const findAllUserUsers = require('./db/find-all.user-users.use-cases');
const createUser = require('./db/create.users.use-cases');
const createUserUser = require('./db/create.user-user.use-cases');
const deleteUser = require('./db/delete.users.use-cases');
const updateUser = require('./db/update.users.use-cases');
const findOneUserDetail = require('./db/find-one.users-detail.use-cases');
const registerUser = require('./db/register.users.use-cases');
const findOneUserUserPrincipal = require('./db/find-one.user-users-principal.use-cases');

module.exports = {
  findAllUsers: findAllUsers(adapters.findAllQuery),
  findAllUserUsers: findAllUserUsers(adapters.findAllUserUsersQuery, adapters.findOneUserQuery),
  findOneUser: findOneUser(adapters.findOneUserQuery),
  findOneUserDetail: findOneUserDetail(adapters.findOneUserQuery),
  createUser: createUser(
    adapters.createQuery,
    adapters.findOneUserQuery,
    adapters.createInspector,
    adapters.createEvaluador,
    adapters.createVigilante,
  ),
  registerUser: registerUser(
    adapters.createQuery,
    adapters.findOneUserQuery,
  ),
  createUserUser: createUserUser(
    adapters.createUserUsersQuery,
    adapters.createQuery,
    adapters.findOneUserQuery,
  ),
  updateUser: updateUser(
    adapters.findOneUserQuery,
    adapters.updateUserQuery,
    adapters.updatePersonaQuery,
    adapters.updateDomicilioQuery,
    adapters.createDomicilioQuery,
  ),
  deleteUser: deleteUser(adapters.deleteQuery),
  findOneUserUserPrincipal: findOneUserUserPrincipal(
    adapters.findAllUserUsersQuery,
    adapters.findOneUserQuery,
  ),
};
