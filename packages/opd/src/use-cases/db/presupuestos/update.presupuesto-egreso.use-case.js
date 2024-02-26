const { checkers } = require('@siiges-services/shared');

const validatePresupuestos = async ({
  dataArray,
  findOneTipoEgresoQuery,
  findOneTipoPresupuestoQuery,
  findOneTipoRecursoPresupuestoQuery,
}) => {
  await Promise.all(dataArray.map(async ({
    tipoEgresoId, tipoPresupuestoId, tipoRecursoPresupuestoId,
  }) => {
    const queryFunctionsPresupuestos = {
      TipoEgreso: [tipoEgresoId, findOneTipoEgresoQuery],
      TipoPresupuesto: [tipoPresupuestoId, findOneTipoPresupuestoQuery],
      TipoRecursoPresupuesto: [
        tipoRecursoPresupuestoId, findOneTipoRecursoPresupuestoQuery],
    };
    await checkers.findValidator(queryFunctionsPresupuestos);
  }));
};

const updateOrCreatePresupuesto = async ({
  dataArray,
  presupuestoEgresoId,
  updatePresupuestoQuery,
  createPresupuestoQuery,
  findOnePresupuestoQuery,
}) => {
  await Promise.all(dataArray.map(async (presupuesto) => {
    const presupuestoExists = await findOnePresupuestoQuery({
      id: presupuesto.id || 0,
    });
    const dataBody = { ...presupuesto, presupuestoEgresoId };
    if (presupuestoExists) {
      await updatePresupuestoQuery({ id: presupuestoExists.id }, {
        ...presupuesto,
        presupuestoEgresoId,
      });
    }
    if (!presupuestoExists) {
      await createPresupuestoQuery(dataBody);
    }
  }));
};

const updatePresupuesto = (
  findOneTipoEgresoQuery,
  findOneTipoPresupuestoQuery,
  findOneTipoRecursoPresupuestoQuery,
  findOnePresupuestoQuery,
  createPresupuestoQuery,
  updatePresupuestoQuery,
  findOnePresupuesto,
) => async ({ presupuestoEgresoId, data: dataArray }) => {
  await validatePresupuestos({
    dataArray,
    findOneTipoEgresoQuery,
    findOneTipoPresupuestoQuery,
    findOneTipoRecursoPresupuestoQuery,
  });

  await updateOrCreatePresupuesto({
    dataArray,
    presupuestoEgresoId,
    findOnePresupuestoQuery,
    createPresupuestoQuery,
    updatePresupuestoQuery,
  });

  const findPresupuesto = await findOnePresupuesto({ presupuestoEgresoId });

  return findPresupuesto;
};

module.exports = { updatePresupuesto };
