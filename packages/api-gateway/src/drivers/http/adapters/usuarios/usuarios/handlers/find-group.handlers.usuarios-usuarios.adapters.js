// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../../utils/errorHandler');

async function findGroupUsuariosUsuarios(fastify, identifier) {
  Logger.info('[api/usuarios/findGroup]: finding the list of usuarios - usuarios');

  const usuarios = await fastify.usuarioServices.findAllUserUsers(identifier);
  checkers.throwErrorIfDataIsFalsy(usuarios);
  Logger.info('[api/usuarios/findAll]: the list of usuarios - usuarios was found');

  return usuarios;
}

async function findGroup(req, reply) {
  try {
    const { usuarioId } = req.params;
    const usuarios = await findGroupUsuariosUsuarios(this, usuarioId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuarios });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = findGroup;
