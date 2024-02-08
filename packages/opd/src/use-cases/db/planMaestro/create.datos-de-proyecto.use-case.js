const { checkers } = require('@siiges-services/shared');

const createDatosDeProyecto = (
  createProyectoEspacioQuery,
  findOnePlanMaestroQuery,
  createProyectoQuery,
  createTipoProyectoQuery,
  createContratoQuery,
  findOneTipoProyectoQuery,
  findDatosPlanMaestro,
) => async ({
  planMaestroId, proyectoEspacio, proyectoTipoProyecto, ...data
}) => {
  // Validators
  await checkers.findValidator({ PlanMaestro: [planMaestroId, findOnePlanMaestroQuery] });
  await Promise.all(proyectoTipoProyecto.map(async (tipoProyecto) => {
    const { tipoProyectoId } = tipoProyecto;
    await checkers.findValidator({ TipoProyecto: [tipoProyectoId, findOneTipoProyectoQuery] });
  }));
  const { id: contratoId } = await createContratoQuery(
    data.contrato,
  );

  const datosDelProyecto = await createProyectoQuery({
    planMaestroId,
    contratoId,
    montoNoContratado: data.montoAutorizado - data.montoContratado,
    remanente: data.montoAutorizado - data.montoEjercido,
    ...data,
  });

  await Promise.all(proyectoTipoProyecto.map(async (tipoProyecto) => {
    const { tipoProyectoId } = tipoProyecto;
    await createTipoProyectoQuery({
      tipoProyectoId,
      proyectoId: datosDelProyecto.id,
    });
  }));
  await Promise.all(proyectoEspacio.map(async (equipamientoData) => {
    await createProyectoEspacioQuery({
      ...equipamientoData,
      proyectoId: datosDelProyecto.id,
    });
  }));

  const [findDatosProyecto] = await findDatosPlanMaestro({ id: datosDelProyecto.id });

  return findDatosProyecto;
};

module.exports = { createDatosDeProyecto };
