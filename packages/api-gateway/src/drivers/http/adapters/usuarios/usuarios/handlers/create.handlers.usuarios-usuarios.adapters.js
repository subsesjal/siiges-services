// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
// Internal dependencies
const errorHandler = require('../../../../utils/errorHandler');

async function createUsuarioUsuario(fastify, req) {
  const { usuarioId } = req.params;
  const { ...data } = req.body;

  if (!usuarioId) {
    throw boom.badRequest(
      '[api/usuarios-usuarios/create]: the request needs these query parameters: usuarioId',
    );
  }

  Logger.info('[api/usuarios-usuarios/create]: creating usurio');
  const usuario = await fastify.usuarioServices.createUserUser(usuarioId, data);
  checkers.throwErrorIfDataIsFalsy(usuario);
  Logger.info('[api/usuarios-usuarios/create]: the usuario was found');

  return usuario;
}

async function create(req, reply) {
  try {
    const newUsuario = await createUsuarioUsuario(this, req);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newUsuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = create;
