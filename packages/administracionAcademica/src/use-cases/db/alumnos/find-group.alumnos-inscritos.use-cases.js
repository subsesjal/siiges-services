const { checkers } = require('@siiges-services/shared');

const findAlumnosInscritos = (
  findAllAlumnoGrupoQuery,
  findAllCalificacionesQuery,
) => async ({ grupoId }) => {
  const include = [{
    association: 'alumno',
    include: [{ association: 'persona' }],
  }];
  const findAllAlumnoGrupo = await findAllAlumnoGrupoQuery({ grupoId }, { include });
  checkers.throwErrorIfDataIsFalsy(findAllAlumnoGrupo.length, 'Grupo', grupoId);

  await Promise.all(findAllAlumnoGrupo.map(async (obj) => {
    const { alumnoId } = obj;
    const findParams = { alumnoId, grupoId, tipo: 1 };
    const calificacion = await findAllCalificacionesQuery(findParams);
    // eslint-disable-next-line no-param-reassign
    obj.dataValues.alumnoAsignaturas = calificacion;
  }));

  return findAllAlumnoGrupo;
};

module.exports = { findAlumnosInscritos };
