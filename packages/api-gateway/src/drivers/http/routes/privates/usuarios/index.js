// Internal dependencies
const { usuariosAdapter, usuariosUsuariosAdapter } = require('../../../adapters');

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
    {
      schema: getAllUsuariosSchema,
      onRequest: [fastify.authenticate],
    },
    usuariosAdapter.findAll,
  );

  await fastify.get(
    '/:usuarioId',
    {
      schema: getUsuarioSchema,
      onRequest: [fastify.authenticate],
    },
    usuariosAdapter.findOne,
  );

  await fastify.get(
    '/:usuarioId/detalle',
    {
      schema: getUsuarioDetalleSchema,
      onRequest: [fastify.authenticate],
    },
    usuariosAdapter.findOneDetail,
  );

  await fastify.get(
    '/:usuarioId/usuarios',
    {
      schema: getAllUsuarioUsuariosSchema,
      onRequest: [fastify.authenticate],
    },
    usuariosUsuariosAdapter.findGroup,
  );

  await fastify.post(
    '/',
    {
      schema: createUsuarioSchema,
      onRequest: [fastify.authenticate],
    },
    usuariosAdapter.create,
  );

  await fastify.post(
    '/:usuarioId/usuario',
    {
      schema: createUsuarioUsuarioSchema,
      onRequest: [fastify.authenticate],
    },
    usuariosUsuariosAdapter.create,
  );

  await fastify.patch(
    '/:usuarioId',
    {
      schema: updateUsuarioSchema,
      onRequest: [fastify.authenticate],
    },
    usuariosAdapter.update,
  );

  await fastify.delete(
    '/:usuarioId',
    {
      schema: deleteUsuarioSchema,
      onRequest: [fastify.authenticate],
    },
    usuariosAdapter.deleteOne,
  );

  next();
}

module.exports = usuarioRouter;
