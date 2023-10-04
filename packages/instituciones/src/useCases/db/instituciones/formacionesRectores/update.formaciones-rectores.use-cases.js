const { checkers } = require('@siiges-services/shared');

const updateFormacionRector = (
  findOneFormacionRectorQuery,
  findOneNivelQuery,
  updateFormacionQuery,
) => async ({ rectorId, formacionId, ...dataBody }) => {
  const { nivelId: id } = dataBody;

  // Repeat findOneFormacionRector function (DRY)
  await findOneFormacionRectorQuery({ rectorId, formacionId });

  const findNivel = await findOneNivelQuery({ id });
  checkers.throwErrorIfDataIsFalsy(findNivel, 'Nivel', id);
  const updateFormacion = await updateFormacionQuery({ id: formacionId }, dataBody);

  return updateFormacion;
};

module.exports = { updateFormacionRector };
