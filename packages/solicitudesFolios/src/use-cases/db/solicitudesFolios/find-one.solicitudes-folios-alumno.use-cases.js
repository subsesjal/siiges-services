const { checkers } = require('@siiges-services/shared');

const findOneSolicitudFolioAlumno = (findOneSolicitudFolioAlumnoQuery) => async ({ id }) => {
  const include = [
    {
      association: 'alumno',
      include: [
        { association: 'persona' },
      ],
    },
  ];

  const alumno = await findOneSolicitudFolioAlumnoQuery({ id }, { include });
  checkers.throwErrorIfDataIsFalsy(alumno, 'solicitudes-folios-alumnos', id);

  return alumno;
};

module.exports = findOneSolicitudFolioAlumno;
