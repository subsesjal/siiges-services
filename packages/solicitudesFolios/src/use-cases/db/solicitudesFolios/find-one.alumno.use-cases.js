const { checkers } = require('@siiges-services/shared');

const findOneAlumno = (findOneAlumnoQuery) => async ({ id }) => {
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

    const alumno = await findOneAlumnoQuery({ id }, { include });
    checkers.throwErrorIfDataIsFalsy(alumno, 'solicitudes-folios-alumnos', id);

    return alumno;
  } catch (error) {
    throw new Error(`Error finding alumno: ${error.message}`);
  }
};

module.exports = findOneAlumno;
