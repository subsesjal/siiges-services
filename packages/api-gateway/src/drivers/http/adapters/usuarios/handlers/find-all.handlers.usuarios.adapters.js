// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findAllUsuarios(fastify) {
  Logger.info('[api/usuarios/findAll]: finding the list of usuarios');

  const usuarios = await fastify.usuarioServices.findAllUsers();
  checkers.throwErrorIfDataIsFalsy(usuarios);
  Logger.info('[api/usuarios/findAll]: the list of usuarios was found');

  return usuarios;
}

async function findAll(req, reply) {
  try {
    const usuarios = await findAllUsuarios(this);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuarios });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findAll;
