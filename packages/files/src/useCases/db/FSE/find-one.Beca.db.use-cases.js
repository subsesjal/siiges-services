/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');
const { checkers, constants } = require('@siiges-services/shared');
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
  const rutaArchivo = `BECA_${solicitudId}.pdf`;
  const ubication = getUbication(fileMetdata, rutaArchivo);
  const data = createData(identifierObj, rutaArchivo, ubication);
  const ruta = path.join(constants.rootDir, 'public', ubication);

  try {
    // Asegurar que la carpeta de destino exista
    fs.mkdirSync(path.dirname(ruta), { recursive: true });

    // Crear buffer y escribir el archivo
    fs.writeFileSync(ruta, Buffer.from(fileUploaded));

    Logger.info(`[files/fs.create]: ${rutaArchivo} file created`);

    if (previousFile) {
      return updateFile(previousFile.id, data);
    }

    return createFile(data);
  } catch (error) {
    throw boom.conflict(`Error al crear el archivo PDF de la beca: ${error.message}`);
  }
}

const findFileBeca = (
  findOneSolicitudBecaQuery,
  findAllSolicitudBecaAlumnoQuery,
  GenerarBeca,
) => async (solicitudBecaId, fileMetdata, data) => {
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

    const solicitudPrograma = await findOneSolicitudBecaQuery({ id: solicitudBecaId }, {
      include: includePrograma,
      strict: false,
    });

    // Validar que la solicitud de programa exista
    checkers.throwErrorIfDataIsFalsy(solicitudPrograma, 'solicitudPrograma', solicitudBecaId);

    // Buscar alumnos vinculados a la solicitud de servicio social
    const includeAlumnos = [
      { association: 'alumno', include: [{ association: 'persona' }] },
      { association: 'grado' },
      { association: 'estatusAlumnoBeca' },
      { association: 'solicitudBeca' },
      { association: 'tipoAlumnoBeca' },
    ];

    const solicitudAlumnos = await findAllSolicitudBecaAlumnoQuery({ solicitudBecaId }, {
      include: includeAlumnos,
      strict: false,
    });

    // Generar el PDF de la beca con la información obtenida
    const file = await GenerarBeca(solicitudPrograma, solicitudAlumnos);

    // Guardar el PDF generado
    await uploadFile(data, fileMetdata, file, solicitudBecaId);
  } catch (error) {
    Logger.error(`[findFileBeca]: Error procesando la solicitud ${solicitudBecaId} - ${error.message}`);
    throw boom.internal(`Error generando el archivo de beca: ${error.message}`);
  }
};

module.exports = { findFileBeca };
