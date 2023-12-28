// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Usuario, UsuarioUsuario, Persona, Domicilio, Inspector, Evaluador, Vigilante,
} = models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneUserQuery: findOneQuery(Usuario),
  findAllQuery: findAllQuery(Usuario),
  findAllUserUsersQuery: findAllQuery(UsuarioUsuario),
  createQuery: createQuery(Usuario),
  deleteQuery: deleteQuery(Usuario),
  updateUserQuery: updateAndFindQuery(Usuario),
  updatePersonaQuery: updateAndFindQuery(Persona),
  updateDomicilioQuery: updateAndFindQuery(Domicilio),
  createUserUsersQuery: createQuery(UsuarioUsuario),
  createDomicilioQuery: createQuery(Domicilio),
  createInspector: createQuery(Inspector),
  createEvaluador: createQuery(Evaluador),
  createVigilante: createQuery(Vigilante),
};
