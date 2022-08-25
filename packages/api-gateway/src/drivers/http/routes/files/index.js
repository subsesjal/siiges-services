const multer = require('fastify-multer'); // or import multer from 'fastify-multer'
const boom = require('@hapi/boom');
const { filesAdapter } = require('../../adapters');
const { TIPO_EXTENSION } = require('../../utils/constants');

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const fileFilter = (req, file, cb) => {
  const tipoExtension = TIPO_EXTENSION.find((item) => item.mimeType === file.mimetype);
  if (!tipoExtension) {
    cb(null, () => {
      throw boom.unsupportedMediaType(
        '[files:uploadFile]: that media is not supported',
      );
    });
  } else if (tipoExtension) {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter,
});

async function fileRouter(fastify, opts, done) {
  await fastify.get(
    '/',
    filesAdapter.findOneFile,
  );

  await fastify.post(
    '/',
    { preHandler: upload.single('archivoAdjunto') },
    filesAdapter.uploadFile,
  );

  await fastify.delete(
    '/',
    filesAdapter.deleteFile,
  );

  done();
}

module.exports = fileRouter;
