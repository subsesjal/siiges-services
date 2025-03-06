const { checkers } = require('@siiges-services/shared');

const findOneSolicitudBecasAlumno = (
  findOneSolicitudesBecasAlumnoQuery,
  findOneSolicitudBecaQuery, // Asegúrate de pasar esta función
) => async (identifierObj) => {
  const include = [
    { association: 'alumno' },
    { association: 'grado' },
    { association: 'estatusAlumnoBeca' },
    { association: 'tipoAlumnoBeca' },
  ];

  // Estructura correcta para checkers.findValidator
  const queryFunctions = {
    solicitudBeca: [identifierObj.solicitudBecaId, findOneSolicitudBecaQuery],
  };

  // Validar los datos
  await checkers.findValidator(queryFunctions);

  // Construir el objeto de consulta
  const where = { id: Number(identifierObj.solicitudBecaAlumnoId) }; // Convertir a número

  // Depurar el objeto where
  console.log('Where object:', where);

  // Realizar la consulta
  const solicitudCreada = await findOneSolicitudesBecasAlumnoQuery(where, { include });

  return solicitudCreada;
};

module.exports = findOneSolicitudBecasAlumno;
