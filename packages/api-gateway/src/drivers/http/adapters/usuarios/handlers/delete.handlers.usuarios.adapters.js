// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function deleteUsuario(fastify, identifier) {
  Logger.info('[api/usuarios/delete]: deleiting the usuario');

  const usuario = await fastify.usuarioServices.deleteUser({ id: identifier });
  checkers.throwErrorIfDataIsFalsy(usuario);
  Logger.info('[api/usuarios/delete]: the usuario was deleted');

  return usuario;
}

async function deleteOne(request, reply) {
  const { usuarioId } = request.params;

  try {
    const usuario = await deleteUsuario(this, usuarioId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = deleteOne;
