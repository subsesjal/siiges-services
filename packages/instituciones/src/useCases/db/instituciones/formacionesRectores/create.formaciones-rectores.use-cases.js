const { checkers } = require('@siiges-services/shared');

const createFormacionRector = (
  createFormacionRectorQuery,
  findOneRectorQuery,
  findOneNivelQuery,
) => async (identifierObj) => {
  const { rectorId, ...data } = identifierObj;
  const { nivelId } = data;

  // Validations
  const rector = await findOneRectorQuery({ id: rectorId });
  checkers.throwErrorIfDataIsFalsy(rector, 'Rector', rectorId);
  const nivel = await findOneNivelQuery({ id: nivelId });
  checkers.throwErrorIfDataIsFalsy(nivel, 'Nivel', nivelId);

  const dataBody = {
    rectorId,
    formacion: data,
  };
  const include = [{
    association: 'formacion',
  }];

  const { formacion } = await createFormacionRectorQuery(dataBody, include);

  return formacion;
};

module.exports = { createFormacionRector };
