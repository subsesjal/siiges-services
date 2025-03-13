// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../../utils/errorHandler');

async function findUserPrincipal(fastify, identifier) {
  Logger.info('[api/usuarios/findUserPrincipal]: Finding principal user for a given secondary user');

  const usuario = await fastify.usuarioServices.findOneUserUserPrincipal(identifier);
  checkers.throwErrorIfDataIsFalsy(usuario);
  Logger.info('[api/usuarios/findUserPrincipal]: The principal user was found');

  return usuario;
}

async function findOneUserUserPrincipal(req, reply) {
  try {
    const { usuarioId } = req.params;
    const usuario = await findUserPrincipal(this, usuarioId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOneUserUserPrincipal;
