const { Logger, checkers } = require('@siiges-services/shared');

const findDocenteById = async (docenteId, findOneDocenteQuery) => {
  const include = [
    {
      association: 'persona',
      include: [{ association: 'domicilio' }],
    },
    {
      association: 'formacionesDocentes',
      include: [
        { association: 'formacion' },
      ],
    },
    {
      association: 'asignaturasDocentes',
      include: [
        { association: 'asignatura' },
      ],
    },
  ];

  return findOneDocenteQuery({ id: docenteId }, {
    include,
    strict: false,
  });
};

const create = (
  findOneDocenteQuery,
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
          docenteId: newDocente.dataValues.id,
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
          docenteId: newDocente.dataValues.id,
          formacion: formacionDocente,
        }, includeFormacionDocente);
        newFomacionesDocenteArray.push(newFormacionDocente.formacion);
      }),
    );
  }

  Logger.info('[docente/create]: Docente created');

  newDocente.dataValues.asignaturasDocentes = newAsignaturasDocentesArray;
  newDocente.dataValues.formacionesDocentes = newFomacionesDocenteArray;

  const docente = await findDocenteById(newDocente.dataValues.id, findOneDocenteQuery);

  return docente;
};

module.exports = create;
