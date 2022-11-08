// External dependencies
const { drivers, queries } = require('@siiges-services/core');
// Internal dependencies
const persona = require('./persona.db.adapters');
const rol = require('./rol.db.adapters');

const { Usuario, UsuarioUsuario } = drivers.sequelize.models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneQuery: findOneQuery(Usuario),
  findAllQuery: findAllQuery(Usuario),
  findAllUserUsersQuery: findAllQuery(UsuarioUsuario),
  createQuery: createQuery(Usuario),
  deleteQuery: deleteQuery(Usuario),
  updateQuery: updateAndFindQuery(Usuario),
  createUserUsersQuery: createQuery(UsuarioUsuario),
  persona,
  rol,
};
