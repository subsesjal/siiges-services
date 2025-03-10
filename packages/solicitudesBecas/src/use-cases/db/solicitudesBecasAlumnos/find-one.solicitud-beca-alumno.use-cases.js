const { checkers } = require('@siiges-services/shared');

const findOneSolicitudBecasAlumno = (
  findOneSolicitudesBecasAlumnoQuery,
  findOneSolicitudBecaQuery,
) => async (identifierObj) => {
  const include = [
    { association: 'alumno' },
    { association: 'grado' },
    { association: 'estatusAlumnoBeca' },
    { association: 'tipoAlumnoBeca' },
  ];

  const queryFunctions = {
    solicitudBeca: [identifierObj.solicitudBecaId, findOneSolicitudBecaQuery],
  };

  await checkers.findValidator(queryFunctions);

  const where = { id: Number(identifierObj.solicitudBecaAlumnoId) };

  const solicitudCreada = await findOneSolicitudesBecasAlumnoQuery(where, { include });

  return solicitudCreada;
};

module.exports = findOneSolicitudBecasAlumno;
