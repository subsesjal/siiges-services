/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const { checkers } = require('@siiges-services/shared');

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

async function uploadFile(fileMetdata, identifierObj, fileUploaded, alumnoId) {
  const { findOneFile, createFile, updateFile } = require('../files');
  const previousFile = await findOneFile(identifierObj);
  const rutaArchivo = `HISTORIAL_alumnoId_${alumnoId}.pdf`;
  const ubication = getUbication(fileMetdata, rutaArchivo);
  const data = createData(identifierObj, rutaArchivo, ubication);
  const ruta = path.join(__dirname, '../../../../../../public', ubication);

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
const findFileHistorial = (
  findOneAlumnoQuery,
  findAllCalificacionesQuery,
  GenerarHISTORIAL,
) => async (alumnoId, fileMetdata, data) => {
  const alumno = await findOneAlumnoQuery(alumnoId);

  const include = [{
    association: 'programa',
    include: [
      { association: 'plantel' },
      { association: 'institucion' },
    ],
  },
  {
    association: 'asignatura',
  },
  {
    association: 'grupo',
    include: [
      { association: 'cicloEscolar' },
      { association: 'grado' },
    ],
  }];

  const calificaciones = await findAllCalificacionesQuery({ id: alumno }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', alumnoId);

  const file = await GenerarHISTORIAL(alumno, calificaciones);
  await uploadFile(data, fileMetdata, file, alumnoId);
};

module.exports = { findFileHistorial };
