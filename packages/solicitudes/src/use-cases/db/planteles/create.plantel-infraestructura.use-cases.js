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
    const programa = await findOneProgramaQuery({ id: programaId });
    checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

    // create infraestructura
    infraestructura = await createInfraestructuraQuery(newData);

    // create infraestructura - programa
    const infraestructuraPrograma = await createInfraestructuraProgramaQuery({
      infraestructuraId: infraestructura.id,
      programaId,
    });

    infraestructura.dataValues.infraestructuraPrograma = infraestructuraPrograma;

    // save asignaturas - infraestructura
    const newAsignaturasInfraestructuraArray = [];
    await Promise.all(
      newData.asignaturasInfraestructuras.map(async (asignaturaInfraestructura) => {
        const asignatura = await findOneAsignaturaQuery({
          id: asignaturaInfraestructura,
          programaId,
        });
        if (asignatura) {
          const newAsignaturaInfraestructura = await createAsignaturaInfraestructuraQuery({
            asignaturaId: asignaturaInfraestructura,
            infraestructuraId: infraestructura.id,
          });
          newAsignaturasInfraestructuraArray.push(newAsignaturaInfraestructura);
        }
      }),
    );

    infraestructura.dataValues.asignaturasInfraestructuras = newAsignaturasInfraestructuraArray;
  } else {
    // error if tipo instalacion programaId = null
    throw boom.badRequest(
      '[infraestructura:create]: when infraestructura is AULA, the request needs programaId parameter',
    );
  }

  return infraestructura;
};

module.exports = createPlantelInfraestructura;
