// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function findOneUsuarioDetail(fastify, identifier) {
  Logger.info('[api/usuarios/findOne]: finding the usuario with details');

  const usuario = await fastify.usuarioServices.findOneUserDetail({ id: identifier });
  checkers.throwErrorIfDataIsFalsy(usuario);
  Logger.info('[api/usuarios/findOne]: the usuario was found');

  return usuario;
}

async function findOne(req, reply) {
  const { usuarioId } = req.params;
  try {
    const usuario = await findOneUsuarioDetail(this, usuarioId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findOne;
