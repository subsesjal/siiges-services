/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');
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
  return `/uploads/${tipoEntidad}/${tipoDocumento}/${fileName}`;
}

async function uploadFile(fileMetdata, identifierObj, fileUploaded, solicitudId) {
  const { findOneFile, createFile, updateFile } = require('../files');
  const previousFile = await findOneFile(identifierObj);
  const rutaArchivo = `SERVICIO_${solicitudId}.pdf`;
  const ubication = getUbication(fileMetdata, rutaArchivo);
  const data = createData(identifierObj, rutaArchivo, ubication);
  const ruta = path.join(__dirname, '../../../../../../public', ubication);

  try {
    fs.mkdirSync(path.dirname(ruta), { recursive: true });

    fs.writeFileSync(ruta, Buffer.from(fileUploaded));

    Logger.info(`[files/fs.create]: ${rutaArchivo} file created`);

    if (previousFile) {
      return updateFile(previousFile.id, data);
    }

    return createFile(data);
  } catch (error) {
    throw boom.conflict(`Error al crear el archivo PDF del servicio social: ${error.message}`);
  }
}

const findFileServicio = (
  findOneSolicitudServSocQuery,
  findAllSolicitudServSocAlumnoQuery,
  GenerarServicio,
) => async (solicitudServicioSocialId, fileMetdata, data) => {
  try {
    const includePrograma = [
      {
        association: 'programa',
        include: [
          { association: 'programaTurnos' },
          { association: 'trayectoria' },
          { association: 'ciclo' },
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
        association: 'usuario',
        include: [{ association: 'persona' }],
      },
      { association: 'cicloEscolar' },
    ];

    const solicitudPrograma = await findOneSolicitudServSocQuery({
      id: solicitudServicioSocialId,
    }, {
      include: includePrograma,
      strict: false,
    });

    checkers.throwErrorIfDataIsFalsy(solicitudPrograma, 'solicitudPrograma', solicitudServicioSocialId);

    const includeAlumnos = [
      { association: 'alumno', include: [{ association: 'persona' }] },
      { association: 'grado' },
    ];

    const solicitudAlumnos = await findAllSolicitudServSocAlumnoQuery(
      { solicitudServicioSocialId },
      {
        include: includeAlumnos,
        strict: false,
      },
    );

    const file = await GenerarServicio(solicitudPrograma, solicitudAlumnos);

    await uploadFile(data, fileMetdata, file, solicitudServicioSocialId);
  } catch (error) {
    Logger.error(`[findFileServicio]: Error procesando la solicitud ${solicitudServicioSocialId} - ${error.message}`);
    throw boom.internal(`Error generando el archivo de servicio social: ${error.message}`);
  }
};

module.exports = { findFileServicio };
