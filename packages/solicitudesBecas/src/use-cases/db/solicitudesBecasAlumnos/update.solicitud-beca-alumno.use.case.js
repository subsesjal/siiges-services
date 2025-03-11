const { checkers } = require('@siiges-services/shared');

const updateSolicitudBecaAlumno = (
  findOneSolicitudBecaQuery,
  updateAndFindSolicitudBecaQuery,
) => async (data, identifierObj) => {
  const include = [
    { association: 'estatusAlumnoBeca' },
    { association: 'alumno' },
    { association: 'grado' },
  ];

  const solicitudBeca = await findOneSolicitudBecaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudBeca, 'solicitudes_becas', identifierObj.id);

  return updateAndFindSolicitudBecaQuery(identifierObj, data, { include });
};

module.exports = updateSolicitudBecaAlumno;
