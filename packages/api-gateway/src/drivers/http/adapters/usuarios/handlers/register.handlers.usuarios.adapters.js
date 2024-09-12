// Internal dependencies
const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function registerUser(fastify, req) {
  const { ...data } = req.body;

  Logger.info('[api/usuarios/register]: registing usurio');
  const usuario = await fastify.usuarioServices.registerUser(data);

  return usuario;
}

async function register(req, reply) {
  try {
    const newUsuario = await registerUser(this, req);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newUsuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = register;
