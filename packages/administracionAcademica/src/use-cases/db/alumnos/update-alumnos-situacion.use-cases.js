const SITUACION_ACTIVO_ID = 1;
const SITUACION_VALIDACION_AUTENTICO = 1;

const updateAlumnosSituacion = (
  findAllAlumnosQuery,
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

  const activables = [];
  const noActivables = [...idsNoEncontrados];

  alumnosEncontrados.forEach((alumno) => {
    if (alumno.validacion?.situacionValidacionId === SITUACION_VALIDACION_AUTENTICO) {
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
