const {
  TIPOS_DOCUMENTO_REQUERIDOS,
  buildDocumentosPorAlumno,
  tieneDocumentosCompletos,
} = require('./documentos-requeridos.helpers');

const SITUACION_ACTIVO_ID = 1;
const SITUACION_VALIDACION_AUTENTICO = 1;

const updateAlumnosSituacion = (
  findAllAlumnosQuery,
  findAllFilesQuery,
  updateAlumnoQuery,
) => async ({ alumnoIds }) => {
  const alumnosEncontrados = await findAllAlumnosQuery(
    { id: alumnoIds },
    {
      attributes: ['id'],
      include: [
        { association: 'validacion', attributes: ['situacionValidacionId'] },
      ],
    },
  );

  const idsEncontrados = alumnosEncontrados.map((alumno) => alumno.id);
  const idsNoEncontrados = alumnoIds.filter((id) => !idsEncontrados.includes(id));

  const archivos = idsEncontrados.length > 0
    ? await findAllFilesQuery(
      { entidadId: idsEncontrados, tipoDocumentoId: TIPOS_DOCUMENTO_REQUERIDOS },
      { attributes: ['entidadId', 'tipoDocumentoId'] },
    )
    : [];

  const documentosPorAlumno = buildDocumentosPorAlumno(archivos);

  const activables = [];
  const noActivables = [...idsNoEncontrados];

  alumnosEncontrados.forEach((alumno) => {
    const situacionValidacionOk = alumno.validacion?.situacionValidacionId
      === SITUACION_VALIDACION_AUTENTICO;
    const documentosOk = tieneDocumentosCompletos(alumno.id, documentosPorAlumno);

    if (situacionValidacionOk && documentosOk) {
      activables.push(alumno.id);
    } else {
      noActivables.push(alumno.id);
    }
  });

  if (activables.length > 0) {
    await updateAlumnoQuery({ id: activables }, { situacionId: SITUACION_ACTIVO_ID });
  }

  return {
    activados: activables,
    noActivados: noActivables,
    totalActivados: activables.length,
    totalNoActivados: noActivables.length,
  };
};

module.exports = updateAlumnosSituacion;
