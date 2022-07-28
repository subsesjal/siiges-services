const { usuariosAdapter } = require('../../adapters');
const {
  getUsuarioSchema,
  createUsuarioSchema,
  updateUsuarioSchema,
} = require('./schema');

async function usuarioRouter(fastify) {
  await fastify.get('/', usuariosAdapter.findAllUsuarios);

  await fastify.get(
    '/:usuarioId',
    {
      schema: getUsuarioSchema,
      validatorCompiler: ({
        schema, method, url, httpPart, // eslint-disable-line no-unused-vars
      }) => (data) => schema.validate(data, { abortEarly: false }),
    },
    usuariosAdapter.findOneUsuario,
  );

  await fastify.get(
    '/:usuarioId/detalle',
    {
      schema: getUsuarioSchema,
      validatorCompiler: ({
        schema, method, url, httpPart, // eslint-disable-line no-unused-vars
      }) => (data) => schema.validate(data, { abortEarly: false }),
    },
    usuariosAdapter.findOneDetailedUsuario,
  );

  await fastify.post(
    '/',
    {
      schema: createUsuarioSchema,
      validatorCompiler: ({
        schema, method, url, httpPart, // eslint-disable-line no-unused-vars
      }) => (data) => schema.validate(data, { abortEarly: false }),
    },
    usuariosAdapter.createUsuario,
  );

  await fastify.patch(
    '/:usuarioId',
    {
      schema: updateUsuarioSchema,
      validatorCompiler: ({
        schema, method, url, httpPart, // eslint-disable-line no-unused-vars
      }) => (data) => schema.validate(data, { abortEarly: false }),
    },
    usuariosAdapter.updateUsuario,
  );

  await fastify.delete(
    '/:usuarioId',
    {
      schema: getUsuarioSchema,
      validatorCompiler: ({
        schema, method, url, httpPart, // eslint-disable-line no-unused-vars
      }) => (data) => schema.validate(data, { abortEarly: false }),
    },
    usuariosAdapter.deleteUsuario,
  );
}

module.exports = usuarioRouter;
