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
  const rutaArchivo = `RVOE_solicitudId_${solicitudId}.pdf`;
  const ubication = getUbication(fileMetdata, rutaArchivo);
  const data = createData(identifierObj, rutaArchivo, ubication);
  const ruta = path.join(constants.rootDir, 'public', ubication);
  fs.mkdirSync(path.dirname(ruta), { recursive: true });
  const fileBuffer = Buffer.from(fileUploaded);
  const dest = fs.createWriteStream(ruta);
  dest.write(fileBuffer);

  dest.on('finish', () => {
    Logger.info(`[files/fs.create]: ${rutaArchivo} file created`);
    return rutaArchivo;
  });

  dest.on('error', (err) => {
    throw boom.conflict(`There was a conflict: ${err}`);
  });

  if (previousFile) return updateFile(previousFile.id, data);

  return createFile(data);
}
const findFileRVOE = (
  findOneSolicitudProgramaQuery,
  GenerarRVOE,
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

  const file = await GenerarRVOE(solicitud);
  await uploadFile(data, fileMetdata, file, solicitudId);
};

module.exports = { findFileRVOE };
