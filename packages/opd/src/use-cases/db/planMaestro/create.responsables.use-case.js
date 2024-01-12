const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const createResponsables = (
  createPlaneacionQuery,
  createObraYMantenimientoQuery,
  findOnePlanMaestroQuery,
  findOnePlaneacionQuery,
) => async ({ planMaestroId, data }) => {
  await checkers.findValidator({ Plan_maestro: [planMaestroId, findOnePlanMaestroQuery] });

  const { planeacion, obraYMantenimiento } = data;

  const responsableDuplicate = await findOnePlaneacionQuery(
    { planMaestroId },
    { attributes: ['id'] },
  );
  if (responsableDuplicate) {
    throw boom.conflict(`The planMaestroId ${planMaestroId} is already in use`);
  }

  const createdPlaneacion = await createPlaneacionQuery({ planMaestroId, ...planeacion });
  const createdobraYMantenimiento = await createObraYMantenimientoQuery({
    planMaestroId,
    ...obraYMantenimiento,
  });

  return {
    planeacion: createdPlaneacion,
    obraYMantenimiento: createdobraYMantenimiento,
  };
};

module.exports = { createResponsables };
