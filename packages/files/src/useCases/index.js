const { buildIdentifierObj, buildFile } = require('./features');

const deleteFile = require('./delete.files.use-cases');
const uploadFile = require('./upload.files.use-cases');
const findOneFile = require('./find-one.files.use-cases');

module.exports = {
  findOneFile: findOneFile(
    buildIdentifierObj,
    buildFile,
  ),
  uploadFile: uploadFile(
    buildIdentifierObj,
    buildFile,
  ),
  deleteFile,
};
