const { buildIdentifierObj, buildPdfFile } = require('./features');

const deleteFile = require('./delete.files.use-cases');
const uploadFile = require('./upload.files.use-cases');
const findOneFile = require('./find-one.files.use-cases');

module.exports = {
  findOneFile: findOneFile(
    buildIdentifierObj,
    buildPdfFile,
  ),
  uploadFile: uploadFile(
    buildIdentifierObj,
  ),
  deleteFile,
};
