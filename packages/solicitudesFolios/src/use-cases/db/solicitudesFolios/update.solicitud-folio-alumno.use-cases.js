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
          attributes: ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'createdAt', 'updatedAt', 'deletedAt'], // Trae solo estos campos de persona
        },
      ],
    },
  ];

  const { fechaTermino, fechaElaboracion } = data;
  const solicitudFolioAlumno = await findOneSolicitudFolioAlumnoQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudFolioAlumno, 'solicitudes_folios_alumnos', identifierObj.id);

  // eslint-disable-next-line max-len
  const updatedSolicitudFolioAlumno = await updateAndFindSolicitudQuery(identifierObj, { fechaTermino, fechaElaboracion });

  // eslint-disable-next-line max-len
  const alumno = await findOneSolicitudFolioAlumnoQuery({ id: updatedSolicitudFolioAlumno.alumnoId }, { include });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', { id: updatedSolicitudFolioAlumno.alumnoId });

  updatedSolicitudFolioAlumno.dataValues.alumno = alumno;
  return alumno;
};

module.exports = updateSolicitudFolioAlumno;
