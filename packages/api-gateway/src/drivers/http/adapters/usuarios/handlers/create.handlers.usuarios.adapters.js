// External dependencies
const { Logger, checkers } = require('@siiges-services/shared');
// Internal dependencies
const errorHandler = require('../../../utils/errorHandler');

async function createUsuario(fastify, req) {
  const { ...data } = req.body;

  Logger.info('[api/usuarios/create]: creating usurio');
  const usuario = await fastify.usuarioServices.createUser(data);
  checkers.throwErrorIfDataIsFalsy(usuario);
  Logger.info('[api/usuarios/create]: the usuario was found');

  return usuario;
}

async function create(req, reply) {
  try {
    const newUsuario = await createUsuario(this, req);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newUsuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = create;
