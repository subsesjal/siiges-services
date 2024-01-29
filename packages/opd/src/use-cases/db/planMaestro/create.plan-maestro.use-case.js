const { checkers } = require('@siiges-services/shared');

const createPlanMaestro = (
  createPlanMaestroQuery,
  findOneInstitucionQuery,
  findOnePeriodoQuery,
  findOneSesionQuery,
) => async (data) => {
  const queryFunctions = {
    Sesion: [data.sesionId, findOneSesionQuery],
    Institucion: [data.institucionId, findOneInstitucionQuery],
    Periodo: [data.periodoId, findOnePeriodoQuery],
  };
  await checkers.findValidator(queryFunctions);

  const planMaestro = await createPlanMaestroQuery(data);

  return planMaestro;
};

module.exports = { createPlanMaestro };
