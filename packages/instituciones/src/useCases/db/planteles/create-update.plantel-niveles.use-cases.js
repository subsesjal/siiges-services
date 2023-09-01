const { checkers } = require('@siiges-services/shared');

const createUpdatePlantelNiveles = (
  findAllPlantelNivelesQuery,
  findOnePlantelNivelQuery,
  createPlantelNivelQuery,
  deletePlantelNivelQuery,
) => async (
  identifierObject,
  data,
) => {
  const { plantelId } = identifierObject;

  const existingNiveles = await findAllPlantelNivelesQuery({ plantelId });
  const existingNivelesIds = existingNiveles.map((item) => item.edificioNivelId);

  const newNiveles = data.filter((item) => !existingNivelesIds.includes(item.edificioNivelId));
  const deletedNiveles = existingNiveles.filter((
    item,
  ) => !data.some((a) => a.edificioNivelId === item.edificioNivelId));

  // Create new relations
  await Promise.all(newNiveles.map(async (plantelEdificioNivel) => {
    const { edificioNivelId } = plantelEdificioNivel;
    const newPlantelNivel = await createPlantelNivelQuery({
      plantelId,
      edificioNivelId,
    });

    checkers.throwErrorIfDataIsFalsy(newPlantelNivel, 'plantelesEdificiosNiveles', edificioNivelId);
  }));

  // Delete relations
  await Promise.all(deletedNiveles.map(async ({ edificioNivelId }) => {
    const deletePlantelNivel = await findOnePlantelNivelQuery({
      plantelId,
      edificioNivelId,
    });

    if (deletePlantelNivel) {
      await deletePlantelNivelQuery({ id: deletePlantelNivel.id });
    }
  }));

  const updatedPlantelEdificioNiveles = await findAllPlantelNivelesQuery({ plantelId });

  return updatedPlantelEdificioNiveles;
};

module.exports = createUpdatePlantelNiveles;
