const { usuariosAdapter } = require('../../adapters');

const {
  getAllUsuariosSchema,
  getUsuarioSchema,
  getUsuarioDetalleSchema,
  createUsuarioSchema,
  updateUsuarioSchema,
  deleteUsuarioSchema,
} = require('./schema');

async function usuarioRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: getAllUsuariosSchema },
    usuariosAdapter.findAllUsuarios,
  );

  await fastify.get(
    '/:usuarioId',
    {
      schema: getUsuarioSchema,
    },
    usuariosAdapter.findOneUsuario,
  );

  await fastify.get(
    '/:usuarioId/detalle',
    {
      schema: getUsuarioDetalleSchema,
    },
    usuariosAdapter.findOneDetailedUsuario,
  );

  await fastify.post(
    '/',
    {
      schema: createUsuarioSchema,
    },
    usuariosAdapter.createUsuario,
  );

  await fastify.patch(
    '/:usuarioId',
    {
      schema: updateUsuarioSchema,
    },
    usuariosAdapter.updateUsuario,
  );

  await fastify.delete(
    '/:usuarioId',
    {
      schema: deleteUsuarioSchema,
    },
    usuariosAdapter.deleteUsuario,
  );

  next();
}

module.exports = usuarioRouter;
