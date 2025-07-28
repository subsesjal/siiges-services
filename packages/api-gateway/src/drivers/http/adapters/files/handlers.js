const path = require('path');
const fs = require('fs');
const { Logger } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const errorHandler = require('../../utils/errorHandler');
const { tipoExtension } = require('../../utils/constants');

async function downloadFile(req, reply) {
  try {
    const { ...data } = req.query;

    if (!data.ubicacion) {
      throw boom.badRequest(
        '[files:download]: the request needs the query parameter: ubicacion',
      );
    }
    const filePath = path.resolve(__dirname, '../../../../../../../public', data.ubicacion.replace('/uploads/', 'uploads/'));
    const fileName = data.ubicacion;

    return reply
      .header('Content-Disposition', `attachment; filename="${fileName}"`)
      .header('Content-Type', 'application/octet-stream')
      .send(fs.createReadStream(filePath));
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findOneFile(req, reply) {
  Logger.info('[files.findOneFile.handler]: Iniciando búsqueda de archivo');
  try {
    const { ...data } = req.query;

    if (!data.tipoEntidad || !data.entidadId || !data.tipoDocumento) {
      throw boom.badRequest(
        '[files.findOneFile.handler]: El request necesita los parámetros: tipoEntidad, entidadId, tipoDocumento',
      );
    }

    const file = await this.filesServices.findOneFile(data);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: file });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function uploadFile(req, reply) {
  Logger.info('[files.uploadFile.handler]: Iniciando carga de archivo');
  try {
    const data = await req.saveRequestFiles();
    const archivoAdjunto = data.find((files) => files.fieldname === 'archivoAdjunto');
    if (!archivoAdjunto) {
      throw boom.badRequest('[files.uploadFile]: Archivo adjunto requerido.');
    }

    const tipoExtensionFiltered = tipoExtension
      .find((item) => item.mimeType === archivoAdjunto.mimetype);
    if (!tipoExtensionFiltered) {
      throw boom.unsupportedMediaType('[files.uploadFile]: Tipo de archivo no soportado.');
    }

    const { tipoEntidad, entidadId, tipoDocumento } = data[0].fields;
    if (!tipoEntidad || !entidadId || !tipoDocumento) {
      throw boom.badRequest(
        '[files.uploadFile.handler]: El request necesita los parámetros: tipoEntidad, entidadId, tipoDocumento',
      );
    }

    const dataFile = {
      tipoEntidad: tipoEntidad.value,
      entidadId: entidadId.value,
      tipoDocumento: tipoDocumento.value,
    };

    const fileUploaded = await this.filesServices.uploadFile(dataFile, archivoAdjunto);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(fileUploaded);
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function deleteFile(req, reply) {
  try {
    const { ...data } = req.query;

    if (!data.tipoEntidad || !data.entidadId || !data.tipoDocumento) {
      throw boom.badRequest(
        '[files:finOne]: the request needs these parameters: tipoEntidad, entidadId, tipoDocumento',
      );
    }

    Logger.info('[files]: Deleting file');
    const fileDeleted = await this.filesServices.deleteFile(data);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(fileDeleted);
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  findOneFile,
  uploadFile,
  deleteFile,
  downloadFile,
};
