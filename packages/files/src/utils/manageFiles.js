const { Logger } = require('@siiges-services/shared');
const mime = require('mime-types');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const boom = require('@hapi/boom');

const writeBus = async (file, tipoDocumento, tipoEntidad, previousFile = undefined) => {
  const rootPath = path.join(__dirname, '../../../../', 'public', 'uploads', tipoEntidad, tipoDocumento);
  const fileName = `${(tipoDocumento.toLowerCase())}_${Date.now()}.${mime.extension(file.mimetype)}`;

  const existsPath = fs.existsSync(rootPath);
  const statsPath = existsPath && await fsp.stat(rootPath);
  const isDirectory = existsPath && statsPath.isDirectory();

  if (!existsPath && !isDirectory) {
    await fsp.mkdir(rootPath, { recursive: true });
  }

  if (previousFile?.nombre !== undefined) {
    await fsp.unlink(`${rootPath}/${previousFile.nombre}`, (err) => {
      if (err) throw boom.conflict('There was a conflict');
      Logger.info('[files]: File deleted');
    });
  }

  const tmpPath = file.path;
  const targetPath = `${rootPath}/${fileName}`;

  const existsFile = fs.existsSync(`${rootPath}/${fileName}`);
  if (!existsFile) {
    const src = fs.createReadStream(tmpPath);
    const dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
    src.on('end', () => fileName);
    src.on('error', (err) => {
      throw boom.conflict(`There was a conflict: ${err}`);
    });
  }

  return fileName;
};

const deleteBus = async (file = undefined) => {
  const filePath = path.join(__dirname, '../../../../', 'public', file.ubicacion);
  if (file?.nombre !== undefined) {
    await fsp.unlink(filePath, (err) => {
      if (err) throw boom.conflict('There was a conflict');
      Logger.info('[files]: File deleted');
    });
  }
};

module.exports = { writeBus, deleteBus };
