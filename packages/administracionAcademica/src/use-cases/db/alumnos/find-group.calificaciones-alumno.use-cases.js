const { checkers } = require('@siiges-services/shared');
const { Op } = require('sequelize');

const findOneAlumnos = (
  findOneAlumnosQuery,
  findAllCalificacionesQuery,
) => async (identifierObj) => {
  const { alumnoId } = identifierObj;
  const alumno = await findOneAlumnosQuery({ id: alumnoId });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', `id: ${alumnoId}`);
  const include = [
    { association: 'alumno' },
    { association: 'asignatura' },
    {
      association: 'grupo',
      include: [
        { association: 'cicloEscolar' },
        { association: 'grado' },
      ],
    },
  ];

  const calificaciones = await findAllCalificacionesQuery({ alumnoId }, {
    query: { calificacion: { [Op.or]: { [Op.ne]: null, [Op.ne]: '' } } },
    include,
    strict: false,
  });

  return calificaciones;
};

module.exports = findOneAlumnos;
