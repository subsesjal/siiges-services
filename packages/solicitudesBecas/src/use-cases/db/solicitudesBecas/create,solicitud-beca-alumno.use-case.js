const { checkers } = require('@siiges-services/shared');

const createSolicitudBecasAlumno = (
  createSolicitudesBecasAlumnoQuery,
  findOneSolicitudesBecasAlumnoQuery,
  findOneSolicitudBecasQuery,
  findOneAlumnoQuery,
  findOneGradoQuery,
) => async (data) => {
  console.log('Datos recibidos en el caso de uso:', data);

  const include = [
    { association: 'alumno' },
    { association: 'grado' },
    { association: 'estatusAlumnoBeca' },
    { association: 'tipoAlumnoBeca' },
  ];

  const queryFunctions = {
    solicitudBecas: [data.solicitudBecasId, findOneSolicitudBecasQuery],
    alumno: [data.alumnoId, findOneAlumnoQuery],
    grado: [data.gradoId, findOneGradoQuery],
  };

  console.log('Validando entidades existentes...');
  await checkers.findValidator(queryFunctions);

  console.log('Creando solicitud de becas para el alumno...');
  const { id } = await createSolicitudesBecasAlumnoQuery(data);
  console.log('Solicitud creada con ID:', id);

  console.log('Buscando la solicitud creada con sus asociaciones...');
  const solicitudCreada = await findOneSolicitudesBecasAlumnoQuery({ id }, { include });
  console.log('Solicitud creada:', solicitudCreada);

  return solicitudCreada;
};

module.exports = createSolicitudBecasAlumno;
