const { checkers } = require('@siiges-services/shared');

const createDatosDeProyecto = (
  createEspacioDeEquipamentoQuery,
  findOnePlanMaestroQuery,
  createDatosDelProyectoQuery,
  createTipoDeProyectoQuery,
  createContratoYCalendarioQuery,
) => async ({ planMaestroId, espacioDeEquipamento, ...data }) => {
  await checkers.findValidator({ PlanMaestro: [planMaestroId, findOnePlanMaestroQuery] });
  const { id: tipoDeProyectoId } = await createTipoDeProyectoQuery(data.tipoDeProyecto);
  const { id: contratoYCalendarioId } = await createContratoYCalendarioQuery(
    data.contratoYCalendario,
  );

  const datosDelProyecto = await createDatosDelProyectoQuery({
    planMaestroId,
    contratoYCalendarioId,
    tipoDeProyectoId,
    montoNoContratado: data.montoAutorizado - data.montoContratado,
    remanente: data.montoAutorizado - data.montoEjercido,
    ...data,
  });

  await Promise.all(espacioDeEquipamento.map(async (equipamientoData) => {
    await createEspacioDeEquipamentoQuery({
      ...equipamientoData,
      datosDelProyectoId: datosDelProyecto.id,
    });
  }));

  return datosDelProyecto;
};

module.exports = { createDatosDeProyecto };
