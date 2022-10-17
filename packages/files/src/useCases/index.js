const deleteFile = require('./delete.files.use-cases');
const uploadFile = require('./upload.files.use-cases');
const { findOneFile, getFileIdentifierObj } = require('./db');

module.exports = {
  deleteFile,
  findOneFile,
  getFileIdentifierObj,
  uploadFile,
};
