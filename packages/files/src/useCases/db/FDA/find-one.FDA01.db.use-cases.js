/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const { checkers, constants } = require('@siiges-services/shared');

function createData({ tipoDocumentoId, tipoEntidadId, entidadId }, nombre, ubicacion) {
  return {
    entidadId,
    nombre,
    tipoDocumentoId,
    tipoEntidadId,
    ubicacion,
  };
}

function getUbication({ tipoEntidad, tipoDocumento }, fileName) {
  return `/uploads/${tipoEntidad}/${tipoDocumento}/${(fileName)}`;
}

async function uploadFile(fileMetdata, identifierObj, fileUploaded, solicitudId) {
  const { findOneFile, createFile, updateFile } = require('../files');
  const previousFile = await findOneFile(identifierObj);
  const rutaArchivo = `FDA01_solicitudId_${solicitudId}.pdf`;
  const ubication = getUbication(fileMetdata, rutaArchivo);
  const data = createData(identifierObj, rutaArchivo, ubication);
  const ruta = path.join(process.env.PATH_FILE, 'public', ubication);

  // Asegurarse de que las carpetas de destino existan
  fs.mkdirSync(path.dirname(ruta), { recursive: true });

  // Crear un buffer a partir de los datos del archivo
  const fileBuffer = Buffer.from(fileUploaded);

  // Crear un stream de escritura
  const dest = fs.createWriteStream(ruta);

  // Escribir el buffer en el stream de escritura
  dest.write(fileBuffer);

  // Manejar el evento 'finish'
  dest.on('finish', () => {
    Logger.info(`[files/fs.create]: ${rutaArchivo} file created`);
    return rutaArchivo;
  });

  // Manejar el evento 'error'
  dest.on('error', (err) => {
    throw boom.conflict(`There was a conflict: ${err}`);
  });

  if (previousFile) return updateFile(previousFile.id, data);

  return createFile(data);
}
const findFileFDA01 = (
  findOneSolicitudProgramaQuery,
  GenerarFDA01,
) => async (solicitudId, fileMetdata, data) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
      { association: 'trayectoria' },
      {
        association: 'plantel',
        include: [{
          association: 'domicilio',
          include: [
            { association: 'estado' },
            { association: 'municipio' },
          ],
        },
        {
          association: 'directores',
          include: [
            { association: 'persona' },
            {
              association: 'formacionesDirectores',
              include: [{ association: 'formacion' }],
            },
          ],
        },
        {
          association: 'institucion',
          include: [
            { association: 'ratificacionesNombre' },
            {
              association: 'rector',
              include: [
                { association: 'persona' },
                {
                  association: 'formacionesRectores',
                  include: [{ association: 'formacion' }],
                },
              ],
            },
          ],
        }],
      }],
  },
  {
    association: 'diligencias',
    include: [{ association: 'persona' }],
  },
  {
    association: 'usuario',
    include: [{ association: 'persona' }],
  },
  { association: 'estatusSolicitud' }];

  const solicitud = await findOneSolicitudProgramaQuery({ id: solicitudId }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud', solicitudId);

  const file = await GenerarFDA01(solicitud);
  await uploadFile(data, fileMetdata, file, solicitudId);
};

module.exports = { findFileFDA01 };
