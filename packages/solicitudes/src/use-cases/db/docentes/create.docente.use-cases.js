const { Logger, checkers } = require('@siiges-services/shared');

const create = (
  findOneAsignaturaQuery,
  createDocenteQuery,
  createAsignaturaDocenteQuery,
  findOneNivelQuery,
  createFormacionDocenteQuery,
) => async ({ formacionesDocente, ...data }) => {
  const { programaId } = data;
  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  }];

  if (formacionesDocente) {
    await Promise.all(
      formacionesDocente.map(async ({ nivelId }) => {
        await checkers.findValidator({ Nivel: [nivelId, findOneNivelQuery] });
      }),
    );
  }

  const newDocente = await createDocenteQuery(data, include);

  const newAsignaturasDocenteArray = [];
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
        newAsignaturasDocenteArray.push(newAsignaturaDocente);
      }
    }),
  );

  const newFomacionesDocenteArray = [];
  if (formacionesDocente) {
    const includeFormacionDocente = [{
      association: 'formacion',
    }];
    await Promise.all(
      formacionesDocente.map(async (formacionDocente) => {
        const newFormacionDocente = await createFormacionDocenteQuery({
          docenteId: newDocente.id,
          formacion: formacionDocente,
        }, includeFormacionDocente);
        newFomacionesDocenteArray.push(newFormacionDocente.formacion);
      }),
    );
  }

  Logger.info('[docente/create]: Docente created');

  newDocente.dataValues.asignaturasDocentes = newAsignaturasDocenteArray;
  newDocente.dataValues.formacionesDocente = newFomacionesDocenteArray;

  return newDocente;
};

module.exports = create;
