const deleteFile = require('./delete.files.use-cases');
const uploadFile = require('./upload.files.use-cases');
const { findOneFileByParams } = require('./db');

module.exports = {
  deleteFile,
  findOneFileByParams,
  uploadFile,
};
