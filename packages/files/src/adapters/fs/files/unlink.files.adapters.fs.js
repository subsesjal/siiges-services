const boom = require('@hapi/boom');
const { Logger, checkers } = require('@siiges-services/shared');
const fsp = require('fs/promises');

async function unlink(filePath) {
  await fsp.unlink(filePath, (err) => {
    if (err) throw boom.conflict('There was a conflict');

    Logger.info('[files]: File deleted');
  });
}
async function unlinkIfNameIsDefined(file, fileToUnlinkPath) {
  if (checkers.isDefined(file?.nombre)) unlink(fileToUnlinkPath);
}

module.exports = unlinkIfNameIsDefined;
