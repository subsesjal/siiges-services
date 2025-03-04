const { checkers } = require('@siiges-services/shared');

const createSolicitudBecasAlumno = (
  createSolicitudesBecasAlumnoQuery,
  findOneSolicitudesBecasAlumnoQuery,
  findOneSolicitudBecasQuery,
  findOneAlumnoQuery,
  findOneGradoQuery,
) => async (data) => {
  const include = [
    { association: 'alumno' },
    { association: 'grado' },
  ];

  const queryFunctions = {
    solicitudBecas: [data.solicitudBecasId, findOneSolicitudBecasQuery],
    alumno: [data.alumnoId, findOneAlumnoQuery],
    grado: [data.gradoId, findOneGradoQuery],
  };

  await checkers.findValidator(queryFunctions);

  const { id } = await createSolicitudesBecasAlumnoQuery(data);

  const solicitudCreada = await findOneSolicitudesBecasAlumnoQuery({ id }, { include });

  return solicitudCreada;
};

module.exports = createSolicitudBecasAlumno;
