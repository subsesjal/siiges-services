const { checkers } = require('@siiges-services/shared');

const updateSolicitudBecaAlumno = (
  findOneSolicitudBecaQuery,
  updateSolicitudBecaAlumnoQuery,
) => async (data, identifierObj) => {
  const include = [
    { association: 'estatusAlumnoBeca' },
    { association: 'alumno' },
    { association: 'grado' },
  ];

  const solicitudBecaAlumnos = await findOneSolicitudBecaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudBecaAlumnos, 'solicitudes_becas_alumno', identifierObj.id);

  return updateSolicitudBecaAlumnoQuery(identifierObj, data, { include });
};

module.exports = updateSolicitudBecaAlumno;
