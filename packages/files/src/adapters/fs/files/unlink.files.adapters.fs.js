const fsp = require('fs/promises');
const boom = require('@hapi/boom');
const { Logger, checkers } = require('@siiges-services/shared');

async function unlink(filePath) {
  Logger.info('[files]: Deleting file');
  try {
    await fsp.unlink(filePath);
    Logger.info('[files]: File deleted');
  } catch (err) {
    if (err.code === 'ENOENT') {
      Logger.warn(`[files]: Archivo previo no existe, se omite unlink: ${filePath}`);
      return;
    }
    throw boom.conflict(`Hubo un conflicto al eliminar el archivo: ${err.message}`);
  }
}
async function unlinkIfNameIsDefined(file, fileToUnlinkPath) {
  if (checkers.isDefined(file?.nombre)) await unlink(fileToUnlinkPath);
}

module.exports = unlinkIfNameIsDefined;
