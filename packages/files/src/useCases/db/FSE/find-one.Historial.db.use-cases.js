const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');
const { constants } = require('@siiges-services/shared');
const Logger = require('../../../../../shared/src/utils/logger/index');

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
  // eslint-disable-next-line no-shadow, global-require
  const { findOneFile, createFile, updateFile } = require('../files');
  const previousFile = await findOneFile(identifierObj);
  const rutaArchivo = `HISTORIAL_alumnoId_${alumnoId}.pdf`;
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
const findFileHistorial = (
  findOneAlumnoQuery,
  findAllCalificacionesQuery,
  GenerarHISTORIAL,
) => async (alumnoId, fileMetdata, data) => {
  let include = [
    { association: 'persona' },
    { association: 'alumnoTipoTramites' },
    {
      association: 'programa',
      include: [{
        association: 'plantel',
        include: [
          { association: 'institucion' },
          { association: 'domicilio' },
        ],
      }],
    },
  ];
  const alumno = await findOneAlumnoQuery({ id: alumnoId }, {
    include,
    strict: false,
  });
  include = [
    { association: 'alumno' },
    { association: 'asignatura' },
    {
      association: 'grupo',
      include: [
        { association: 'cicloEscolar' },
        { association: 'grado' },
      ],
    },
  ];
  const calificaciones = await findAllCalificacionesQuery({ alumnoId }, {
    include,
    strict: false,
  });
  const file = await GenerarHISTORIAL(alumno, calificaciones);
  await uploadFile(data, fileMetdata, file, alumnoId);
};

module.exports = { findFileHistorial };
