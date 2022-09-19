const {
  createFileQuery,
  deleteFileQuery,
  findOneFileQuery,
  updateFileQuery,
} = require('../../../adapters/db/files.db.adapters');

const { getFileIdentifierObj } = require('./get-identifier-obj.files.db.use-cases');
const createFile = require('./create.files.db.use-cases');
const deleteFile = require('./delete.files.db.use-cases');
const findOneFileByParams = require('./find-one.files.db.use-cases');
const updateFile = require('./update.files.db.use-cases');

module.exports = {
  getFileIdentifierObj,
  createFile: createFile(createFileQuery),
  deleteFile: deleteFile(deleteFileQuery),
  findOneFileByParams: findOneFileByParams(findOneFileQuery),
  updateFile: updateFile(updateFileQuery),
};
