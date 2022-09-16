const filesModule = require('./files.adapters.fs');
const directoriesModule = require('./directories.adaptes.fs');
const unlinkFileIfFileNameIsDefined = require('./unlink-file.adapters.fs');

module.exports = {
  ...filesModule,
  ...directoriesModule,
  unlinkFileIfFileNameIsDefined,
};
