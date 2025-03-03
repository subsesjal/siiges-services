const { checkers } = require('@siiges-services/shared');

const findOneSolicitudServSocAlumno = (findOneSolicitudServSocAlumnoQuery) => async (id) => {
  const include = [
    { association: 'alumno' },
    { association: 'grado' },
    { association: 'modalidadServicioSocial' },
    { association: 'sectorServicioSocial' },
    {
      association: 'ejeServicioSocial',
      include: [{ association: 'dimensionServicioSocial' }],
    },
  ];

  const solicitudServSocAlumno = await findOneSolicitudServSocAlumnoQuery(
    { id },
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(
    solicitudServSocAlumno,
    'solicitudes_servicio_social_alumnos',
    id,
  );

  return solicitudServSocAlumno;
};

module.exports = findOneSolicitudServSocAlumno;
