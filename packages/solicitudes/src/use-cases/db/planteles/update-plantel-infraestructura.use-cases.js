const { checkers } = require('@siiges-services/shared');

const AULA_ID = 1;

const updateInfraestructura = (
  findOnePlantelQuery,
  findOneInfraestructuraQuery,
  findOneInfraestructuraProgramaQuery,
  findOneProgramaQuery,
  findOneAsignaturaQuery,
  updateInfraestructuraQuery,
  createAsignaturaInfraestructuraQuery,
  findAsignaturasInfraestructuraQuery,
  findOneAsignaturaInfraestructuraQuery,
  deleteAsignaturaInfraestructuraQuery,
) => async (identifierObj, data) => {
  const { plantelId, infraestructuraId } = identifierObj;
  const { programaId } = data;

  // find plantel
  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const infraestructuraFound = await findOneInfraestructuraQuery(
    {
      id: infraestructuraId,
      plantelId,
    },
  );
  checkers.throwErrorIfDataIsFalsy(infraestructuraFound, 'infraestructuras', infraestructuraId);

  const infraestructuraJson = await infraestructuraFound.toJSON();
  let infraestructura;

  if (infraestructuraJson.tipoInstalacionId !== AULA_ID) {
    infraestructura = await updateInfraestructuraQuery({ id: infraestructuraId }, data, { include: [{ association: 'tipoInstalacion' }] });
  } else {
    // update infraestructura
    // find programa
    const programa = await findOneProgramaQuery({ id: programaId, plantelId });
    checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

    const infraestructuraPrograma = await findOneInfraestructuraProgramaQuery({
      infraestructuraId,
      programaId,
    });
    checkers.throwErrorIfDataIsFalsy(infraestructuraPrograma, 'infraestructurasProgramas', `infraestructuraId: ${infraestructuraId} and programaId: ${programaId}`);

    infraestructura = await updateInfraestructuraQuery({ id: infraestructuraId }, data, { include: [{ association: 'tipoInstalacion' }] });
    infraestructura = infraestructura.toJSON();

    const newAsignaturasInfraestructuraArray = [];
    if (data.asignaturasInfraestructura && data.asignaturasInfraestructura.length > 0) {
      let asignaturasInfraestructura = await findAsignaturasInfraestructuraQuery({
        infraestructuraId,
      });

      const include = [{ association: 'asignatura' }];
      // Find and create relation asignatura - infraestructura
      await Promise.all(data.asignaturasInfraestructura.map(async (asignatura) => {
        if (asignaturasInfraestructura.some(({ asignaturaId }) => asignaturaId === asignatura)) {
          const asignaturaInfraestructura = await findOneAsignaturaInfraestructuraQuery({
            asignaturaId: asignatura,
            infraestructuraId,
          }, { include });
          newAsignaturasInfraestructuraArray.push(asignaturaInfraestructura);
        } else {
          const asignaturaFound = await findOneAsignaturaQuery({
            id: asignatura,
            programaId,
          });
          if (asignaturaFound) {
            await createAsignaturaInfraestructuraQuery({
              asignaturaId: asignatura,
              infraestructuraId,
            });
            const newAsignaturaInfraestructura = await findOneAsignaturaInfraestructuraQuery({
              asignaturaId: asignatura,
              infraestructuraId,
            }, {
              include,
            });
            newAsignaturasInfraestructuraArray.push(newAsignaturaInfraestructura);
          }
        }
      }));

      asignaturasInfraestructura = await findAsignaturasInfraestructuraQuery({
        infraestructuraId,
      });
      await Promise.all(asignaturasInfraestructura.map(async ({ asignaturaId }) => {
        if (data.asignaturasInfraestructura.every((a) => a !== asignaturaId)) {
          const deleteAsignaturaInfraestructura = await findOneAsignaturaInfraestructuraQuery({
            asignaturaId,
            infraestructuraId,
          });
          if (deleteAsignaturaInfraestructura) {
            await deleteAsignaturaInfraestructuraQuery({ id: deleteAsignaturaInfraestructura.id });
          }
        }
      }));
    }

    infraestructura.asignaturasInfraestructura = newAsignaturasInfraestructuraArray;
  }

  return infraestructura;
};

module.exports = updateInfraestructura;
