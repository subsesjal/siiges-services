const { checkers } = require('@siiges-services/shared');

const findOneAlumnos = (findOneAlumnosQuery) => async (identifierObj) => {
  const include = [
    { association: 'persona' },
    { association: 'alumnoTipoTramites' },
  ];

  const alumno = await findOneAlumnosQuery(identifierObj, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', identifierObj.id);

  return alumno;
};

module.exports = findOneAlumnos;
