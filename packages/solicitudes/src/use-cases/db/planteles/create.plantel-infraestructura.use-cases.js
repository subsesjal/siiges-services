const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const AULA_ID = 1;

const createPlantelInfraestructura = (
  findOnePlantelQuery,
  findOneProgramaQuery,
  findOneAsignaturaQuery,
  createInfraestructuraQuery,
  createInfraestructuraProgramaQuery,
  createAsignaturaInfraestructuraQuery,
  findOneAsignaturaInfraestructuraQuery,
) => async (identifierObj, data) => {
  const { plantelId } = identifierObj;

  // find plantel
  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  let infraestructura;
  const newData = { plantelId, ...data };

  if (data.tipoInstalacionId !== AULA_ID) {
    infraestructura = await createInfraestructuraQuery(newData);
  } else if (newData.programaId) {
    const { programaId } = newData;

    // find programa
    const programa = await findOneProgramaQuery({ id: programaId, plantelId });
    checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

    // create infraestructura
    infraestructura = await createInfraestructuraQuery(newData);

    // create infraestructura - programa
    const infraestructuraPrograma = await createInfraestructuraProgramaQuery({
      infraestructuraId: infraestructura.id,
      programaId,
    });

    infraestructura.dataValues.infraestructuraPrograma = infraestructuraPrograma;

    const include = [{ association: 'asignatura' }];
    // save asignaturas - infraestructura
    const asignaturasInfraestructuraArray = [];
    await Promise.all(
      newData.asignaturasInfraestructura.map(async (asignaturaInfraestructura) => {
        const asignatura = await findOneAsignaturaQuery({
          id: asignaturaInfraestructura,
          programaId,
        });
        if (asignatura) {
          await createAsignaturaInfraestructuraQuery({
            asignaturaId: asignaturaInfraestructura,
            infraestructuraId: infraestructura.id,
          });

          const newAsignaturaInfraestructura = await findOneAsignaturaInfraestructuraQuery({
            asignaturaId: asignaturaInfraestructura,
            infraestructuraId: infraestructura.id,
          }, {
            include,
          });
          asignaturasInfraestructuraArray.push(newAsignaturaInfraestructura);
        }
      }),
    );

    infraestructura.dataValues.asignaturasInfraestructura = asignaturasInfraestructuraArray;
  } else {
    // error if tipo instalacion programaId = null
    throw boom.badRequest(
      '[infraestructura:create]: when infraestructura is AULA, the request needs programaId parameter',
    );
  }

  return infraestructura;
};

module.exports = createPlantelInfraestructura;
