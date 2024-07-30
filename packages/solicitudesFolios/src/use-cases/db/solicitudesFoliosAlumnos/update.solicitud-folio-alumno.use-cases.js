const { checkers } = require('@siiges-services/shared');

const updateSolicitudFolioAlumno = (
  updateAndFindSolicitudQuery,
  findOneSolicitudFolioAlumnoQuery,
) => async (identifierObj, data) => {
  const include = [
    {
      association: 'alumno',
      include: [
        {
          association: 'persona',
        },
      ],
    },
  ];

  const solicitudFolioAlumno = await findOneSolicitudFolioAlumnoQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudFolioAlumno, 'solicitudes_folios_alumnos', identifierObj.id);

  await updateAndFindSolicitudQuery(identifierObj, data);
  const solicitud = await findOneSolicitudFolioAlumnoQuery(identifierObj, { include });

  return solicitud;
};

module.exports = updateSolicitudFolioAlumno;
