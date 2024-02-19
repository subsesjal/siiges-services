const { checkers } = require('@siiges-services/shared');

const createPresupuesto = (
  findOneInstitucionQuery,
  findOnePeriodoQuery,
  findOneSesionQuery,
  findOneTipoEgresoQuery,
  findOneTipoPresupuestoQuery,
  findOneTipoRecursoPresupuestoQuery,
  createPresupuestoEgresoQuery,
  createPresupuestoQuery,
  findOnePresupuestoEgresoQuery,
) => async ({ presupuesto, ...params }) => {
  const { institucionId, periodoId, sesionId } = params;
  // find validator
  const queryFunctions = {
    Institucion: [institucionId, findOneInstitucionQuery],
    Periodo: [periodoId, findOnePeriodoQuery],
    Sesion: [sesionId, findOneSesionQuery],
  };
  await checkers.findValidator(queryFunctions);
  await Promise.all(presupuesto.map(async (obj) => {
    const queryFunctionsPresupuestos = {
      TipoEgreso: [obj.tipoEgresoId, findOneTipoEgresoQuery],
      TipoPresupuesto: [obj.tipoPresupuestoId, findOneTipoPresupuestoQuery],
      TipoRecursoPresupuesto: [
        obj.tipoRecursoPresupuestoId, findOneTipoRecursoPresupuestoQuery],
    };
    await checkers.findValidator(queryFunctionsPresupuestos);
  }));

  // Create presupuestos
  const presupuestoEgreso = await createPresupuestoEgresoQuery(params);

  await Promise.all(presupuesto.map(async (obj) => {
    await createPresupuestoQuery({
      ...obj,
      presupuestoEgresoId: presupuestoEgreso.id,
    });
  }));

  // get all information query
  const include = [
    {
      association: 'presupuesto',
      include: [
        { association: 'tipoRecursoPresupuesto' },
        { association: 'tipoPresupuesto' },
        { association: 'tipoEgreso' },
      ],
    },
  ];
  const presupuestoData = await findOnePresupuestoEgresoQuery({
    id: presupuestoEgreso.id,
  }, { include });

  return presupuestoData;
};

module.exports = { createPresupuesto };
