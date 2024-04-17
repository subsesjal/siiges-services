const { Logger, checkers } = require('@siiges-services/shared');

const create = (
  findOneAsignaturaQuery,
  createDocenteQuery,
  createAsignaturaDocenteQuery,
  findOneNivelQuery,
  createFormacionDocenteQuery,
) => async ({ formacionesDocentes, ...data }) => {
  const { programaId } = data;
  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  }];

  if (formacionesDocentes) {
    await Promise.all(
      formacionesDocentes.map(async ({ nivelId }) => {
        await checkers.findValidator({ Nivel: [nivelId, findOneNivelQuery] });
      }),
    );
  }

  const newDocente = await createDocenteQuery(data, include);

  const newAsignaturasDocentesArray = [];
  await Promise.all(
    data.asignaturasDocentes.map(async (asignaturaDocente) => {
      const asignatura = await findOneAsignaturaQuery({
        id: asignaturaDocente,
        programaId,
      });
      if (asignatura) {
        const newAsignaturaDocente = await createAsignaturaDocenteQuery({
          asignaturaId: asignaturaDocente,
          docenteId: newDocente.id,
        });
        newAsignaturaDocente.dataValues.asignatura = asignatura;
        newAsignaturasDocentesArray.push(newAsignaturaDocente);
      }
    }),
  );

  const newFomacionesDocenteArray = [];
  if (formacionesDocentes) {
    const includeFormacionDocente = [{
      association: 'formacion',
    }];
    await Promise.all(
      formacionesDocentes.map(async (formacionDocente) => {
        const newFormacionDocente = await createFormacionDocenteQuery({
          docenteId: newDocente.id,
          formacion: formacionDocente,
        }, includeFormacionDocente);
        newFomacionesDocenteArray.push(newFormacionDocente.formacion);
      }),
    );
  }

  Logger.info('[docente/create]: Docente created');

  newDocente.dataValues.asignaturasDocentes = newAsignaturasDocentesArray;
  newDocente.dataValues.formacionesDocentes = newFomacionesDocenteArray;

  return newDocente;
};

module.exports = create;
