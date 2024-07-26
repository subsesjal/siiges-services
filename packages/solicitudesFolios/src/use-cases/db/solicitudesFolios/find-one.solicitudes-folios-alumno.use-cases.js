const { checkers } = require('@siiges-services/shared');

const findOneSolicitudFolioAlumno = (findOneSolicitudFolioAlumnoQuery) => async ({ id }) => {
  try {
    if (!id) throw new Error('ID is required');

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
  } catch (error) {
    throw new Error(`Error finding alumno: ${error.message}`);
  }
};

module.exports = findOneSolicitudFolioAlumno;
