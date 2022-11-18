// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function updateUsuario(fastify, identifier, changes) {
  Logger.info('[api/usuarios/update]: updating usuario');

  const usuario = await fastify.usuarioServices.updateUser(
    { id: identifier },
    changes,
  );
  checkers.throwErrorIfDataIsFalsy(usuario);
  Logger.info('[api/usuarios/updat]: the usuario was updated');

  return usuario;
}

async function update(req, reply) {
  const { usuarioId } = req.params;
  const { ...changes } = req.body;

  try {
    const usuarioUpdated = await updateUsuario(this, usuarioId, changes);
    console.log(usuarioUpdated);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuarioUpdated });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = update;
