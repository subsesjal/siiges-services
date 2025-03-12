const findGroup = require('./find-group.handlers.usuarios-usuarios.adapters');
const create = require('./create.handlers.usuarios-usuarios.adapters');
const findOneUserUserPrincipal = require('./find-one.handlers.usuarios-usuarios-principal.adapters');

module.exports = {
  findGroup,
  create,
  findOneUserUserPrincipal,
};
