/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');
const Logger = require('@siiges-services/shared/src/utils/logger');
const { constants } = require('@siiges-services/shared');

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
  return `/uploads/${tipoEntidad}/${tipoDocumento}/${fileName}`;
}

async function uploadFile(fileMetdata, identifierObj, fileUploaded, solicitudId) {
  const { findOneFile, createFile, updateFile } = require('../files');
  const previousFile = await findOneFile(identifierObj);
  const rutaArchivo = `TITULO_${solicitudId}.pdf`;
  const ubication = getUbication(fileMetdata, rutaArchivo);
  const data = createData(identifierObj, rutaArchivo, ubication);
  const ruta = path.join(process.env.PATH_FILE, 'public', ubication);

  try {
    fs.mkdirSync(path.dirname(ruta), { recursive: true });

    fs.writeFileSync(ruta, Buffer.from(fileUploaded));

    Logger.info(`[files/fs.create]: ${rutaArchivo} file created`);

    if (previousFile) {
      return updateFile(previousFile.id, data);
    }

    return createFile(data);
  } catch (error) {
    throw boom.conflict(`Error al crear el archivo PDF: ${error.message}`);
  }
}

const findFileTitulo = (
  findOneAlumnoTituloElectronicoQuery,
  findOneFileQuery,
  GenerarTitulo,
) => async (alumnoId, fileMetdata, data) => {
  try {
    const include = [{ association: 'tituloElectronico' }];

    const alumnoTituloElectronico = await findOneAlumnoTituloElectronicoQuery(
      { alumnoId },
      {
        include,
        strict: true,
      },
    );

    if (!alumnoTituloElectronico) {
      throw boom.conflict('No se encuentra un título electrónico registrado.');
    }

    const fileXML = await findOneFileQuery({
      tipoDocumentoId: 67,
      tipoEntidadId: 12,
      entidadId: alumnoId,
    });

    if (!fileXML) {
      throw boom.conflict('No se encuentra un título electrónico registrado.');
    }

    const ruta = path.join(process.env.PATH_FILE, 'public', fileXML?.ubicacion);

    const fileStringXML = fs.readFileSync(ruta, 'utf8');

    const file = await GenerarTitulo(alumnoTituloElectronico, fileStringXML);
    await uploadFile(data, fileMetdata, file, alumnoId);
  } catch (error) {
    Logger.error(`[findFileTitulo]: Error procesando la solicitud ${alumnoId} - ${error.message}`);
    throw boom.internal(`Error generando el archivo de titulo: ${error.message}`);
  }
};

module.exports = { findFileTitulo };
