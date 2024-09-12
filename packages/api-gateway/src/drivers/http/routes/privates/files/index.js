const { filesAdapter } = require('../../../adapters');
const uploadFileSchema = require('./schema/update.files.schema');
const { findFileSchema } = require('./schema/find.files.schema');
const { deleteFileSchema } = require('./schema/delete.files.schema');

async function fileRouter(fastify, opts, done) {
  await fastify.get(
    '/',
    {
      schema: findFileSchema,
    },
    filesAdapter.findOneFile,
  );

  await fastify.post(
    '/',
    {
      schema: uploadFileSchema,
    },
    filesAdapter.uploadFile,
  );

  await fastify.delete(
    '/',
    {
      schema: deleteFileSchema,
    },
    filesAdapter.deleteFile,
  );

  done();
}

module.exports = fileRouter;
