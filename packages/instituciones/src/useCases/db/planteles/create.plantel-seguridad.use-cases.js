const { checkers } = require('@siiges-services/shared');

const createPlantelSeguridad = (
  findOnePlantelQuery,
  findOnePlantelSeguridadQuery,
  createPlantelSeguridadQuery,
  updatePlantelSeguridadQuery,
) => async (
  identifierObject,
  data,
) => {
  const { plantelId } = identifierObject;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const result = await Promise.all(data.map(async (item) => {
    const { seguridadSistemaId, cantidad } = item;

    const existingPlantelSeguridad = await findOnePlantelSeguridadQuery({
      plantelId,
      seguridadSistemaId,
    });

    if (existingPlantelSeguridad) {
      const updatedPlantelSeguridad = await updatePlantelSeguridadQuery(
        { id: existingPlantelSeguridad.id },
        { cantidad },
      );
      return updatedPlantelSeguridad;
    }
    const newPlantelSeguridad = await createPlantelSeguridadQuery({
      plantelId,
      seguridadSistemaId,
      cantidad,
    });
    return newPlantelSeguridad;
  }));

  return result;
};

module.exports = createPlantelSeguridad;
