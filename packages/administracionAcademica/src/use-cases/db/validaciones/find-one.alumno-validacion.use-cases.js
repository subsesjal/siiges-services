const { checkers } = require('@siiges-services/shared');

const findOneAlumnoValidacion = (findOneValidacionesQuery) => async ({ alumnoId }) => {
  const include = [
    { association: 'tipo' },
    { association: 'situacion' },
  ];
  const alumnoValidation = await findOneValidacionesQuery({ alumnoId }, { include });

  checkers.throwErrorIfDataIsFalsy(alumnoValidation, 'Alumno', alumnoId);
  return alumnoValidation;
};

module.exports = { findOneAlumnoValidacion };
