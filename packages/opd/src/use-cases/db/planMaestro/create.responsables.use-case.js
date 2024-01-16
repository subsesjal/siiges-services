const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const createResponsables = (
  createResponsablePlaneacionQuery,
  createResponsableObraQuery,
  findOnePlanMaestroQuery,
  findOneResponsablePlaneacionQuery,
) => async ({ planMaestroId, data }) => {
  await checkers.findValidator({ Plan_maestro: [planMaestroId, findOnePlanMaestroQuery] });

  const { planeacion, obraYMantenimiento } = data;

  const responsableDuplicate = await findOneResponsablePlaneacionQuery(
    { planMaestroId },
    { attributes: ['id'] },
  );
  if (responsableDuplicate) {
    throw boom.conflict(`The planMaestroId ${planMaestroId} is already in use`);
  }

  const createdPlaneacion = await createResponsablePlaneacionQuery({
    planMaestroId, ...planeacion,
  });
  const createdobraYMantenimiento = await createResponsableObraQuery({
    planMaestroId,
    ...obraYMantenimiento,
  });

  return {
    planeacion: createdPlaneacion,
    obraYMantenimiento: createdobraYMantenimiento,
  };
};

module.exports = { createResponsables };
