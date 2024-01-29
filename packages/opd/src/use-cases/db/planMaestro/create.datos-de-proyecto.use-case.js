const { checkers } = require('@siiges-services/shared');

const createDatosDeProyecto = (
  createProyectoEspacioQuery,
  findOnePlanMaestroQuery,
  createProyectoQuery,
  createTipoProyectoQuery,
  createContratoQuery,
) => async ({ planMaestroId, proyectoEspacio, ...data }) => {
  await checkers.findValidator({ PlanMaestro: [planMaestroId, findOnePlanMaestroQuery] });
  const { id: tipoProyectoId } = await createTipoProyectoQuery(data.tipoProyecto);
  const { id: contratoId } = await createContratoQuery(
    data.contrato,
  );

  const datosDelProyecto = await createProyectoQuery({
    planMaestroId,
    contratoId,
    tipoProyectoId,
    montoNoContratado: data.montoAutorizado - data.montoContratado,
    remanente: data.montoAutorizado - data.montoEjercido,
    ...data,
  });

  await Promise.all(proyectoEspacio.map(async (equipamientoData) => {
    await createProyectoEspacioQuery({
      ...equipamientoData,
      proyectoId: datosDelProyecto.id,
    });
  }));

  return datosDelProyecto;
};

module.exports = { createDatosDeProyecto };
