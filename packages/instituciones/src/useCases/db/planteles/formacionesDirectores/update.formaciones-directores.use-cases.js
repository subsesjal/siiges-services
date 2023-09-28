const { checkers } = require('@siiges-services/shared');

const updateFormacionDirector = (
  findOneFormacionRectorQuery,
  findOneNivelQuery,
  updateFormacionQuery,
) => async ({ directorId, formacionId, ...dataBody }) => {
  const { nivelId: id } = dataBody;

  // Repeat findOneFormacionRector function (DRY)
  await findOneFormacionRectorQuery({ directorId, formacionId });

  const findNivel = await findOneNivelQuery({ id });
  checkers.throwErrorIfDataIsFalsy(findNivel, 'Nivel', id);
  const updateFormacion = await updateFormacionQuery({ id: formacionId }, dataBody);

  return updateFormacion;
};

module.exports = { updateFormacionDirector };
