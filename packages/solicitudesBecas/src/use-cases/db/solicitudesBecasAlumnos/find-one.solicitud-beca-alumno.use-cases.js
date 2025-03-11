const { checkers } = require('@siiges-services/shared');

const findOneSolicitudBecasAlumno = (
  findOneSolicitudesBecasAlumnoQuery,
  findOneSolicitudBecaQuery,
) => async (query) => {
  const include = [
    {
      association: 'alumno',
      include: [{ association: 'persona' }],
    },
    { association: 'grado' },
    { association: 'estatusAlumnoBeca' },
    { association: 'tipoAlumnoBeca' },
  ];

  const solicitud = await findOneSolicitudBecaQuery({ id: query.solicitudBecaId });
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud_beca', query.solicitudBecaId);

  const solicitudBecaAlumno = await findOneSolicitudesBecasAlumnoQuery(
    query,
    { include },
  );

  checkers.throwErrorIfDataIsFalsy(
    solicitudBecaAlumno,
    'solicitud_beca_alumno',
    Object.entries(query)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', '),
  );

  return solicitudBecaAlumno;
};

module.exports = findOneSolicitudBecasAlumno;
