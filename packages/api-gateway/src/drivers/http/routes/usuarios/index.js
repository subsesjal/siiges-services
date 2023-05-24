const { usuariosAdapter, usuariosUsuariosAdapter } = require('../../adapters');

const {
  getAllUsuariosSchema,
  getUsuarioSchema,
  getUsuarioDetalleSchema,
  createUsuarioSchema,
  createUsuarioUsuarioSchema,
  updateUsuarioSchema,
  deleteUsuarioSchema,
  getAllUsuarioUsuariosSchema,
} = require('./schema');

async function usuarioRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    { schema: getAllUsuariosSchema },
    usuariosAdapter.findAll,
  );

  await fastify.get(
    '/:usuarioId',
    {
      schema: getUsuarioSchema,
    },
    usuariosAdapter.findOne,
  );

  await fastify.get(
    '/:usuarioId/detalle',
    {
      schema: getUsuarioDetalleSchema,
    },
    usuariosAdapter.findOneDetail,
  );

  await fastify.get(
    '/:usuarioId/usuarios',
    {
      schema: getAllUsuarioUsuariosSchema,
    },
    usuariosUsuariosAdapter.findGroup,
  );

  await fastify.post(
    '/',
    { schema: createUsuarioSchema },
    usuariosAdapter.create,
  );

  await fastify.post(
    '/:usuarioId/usuario',
    {
      schema: createUsuarioUsuarioSchema,
    },
    usuariosUsuariosAdapter.create,
  );

  await fastify.patch(
    '/:usuarioId',
    {
      schema: updateUsuarioSchema,
    },
    usuariosAdapter.update,
  );

  await fastify.delete(
    '/:usuarioId',
    {
      schema: deleteUsuarioSchema,
    },
    usuariosAdapter.deleteOne,
  );

  next();
}

module.exports = usuarioRouter;
