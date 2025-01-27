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

async function uploadFile(fileMetdata, identifierObj, fileUploaded, solicitudId) {
  const { findOneFile, createFile, updateFile } = require('../files');
  const previousFile = await findOneFile(identifierObj);
  const rutaArchivo = `SOLICITUD_EQUIVALENCIA_solicitudId_${solicitudId}.pdf`;
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
const findFileSolicitudEquivalencia = (
  findOneAlumnoQuery,
  findAllCalificacionesQuery,
  GenerarSolicitudEquivalencia,
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
  const file = await GenerarSolicitudEquivalencia();
  await uploadFile(data, fileMetdata, file, alumnoId);
};

module.exports = { findFileSolicitudEquivalencia };
