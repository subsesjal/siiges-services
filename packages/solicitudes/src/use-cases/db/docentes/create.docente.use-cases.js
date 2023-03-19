const { Logger } = require('@siiges-services/shared');

const create = (
  findOneAsignaturaQuery,
  createDocenteQuery,
  createAsignaturasDocenteQuery,
) => async (data) => {
  const { programaId } = data;
  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  }];

  const newDocente = await createDocenteQuery(data, include);

  const newAsignaturasDocenteArray = [];
  await Promise.all(
    data.asignaturasDocentes.map(async (asignaturaDocente) => {
      const asignatura = await findOneAsignaturaQuery({
        id: asignaturaDocente,
        programaId,
      });
      if (asignatura) {
        const newAsignaturaDocente = await createAsignaturasDocenteQuery({
          asignaturaId: asignaturaDocente,
          docenteId: newDocente.id,
        });
        newAsignaturasDocenteArray.push(newAsignaturaDocente);
      }
    }),
  );

  Logger.info('[docente/create]: Docente created');

  newDocente.dataValues.asignaturasDocentes = newAsignaturasDocenteArray;

  return newDocente;
};

module.exports = create;
