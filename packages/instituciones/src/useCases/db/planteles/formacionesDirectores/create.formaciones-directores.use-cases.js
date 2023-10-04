const { checkers } = require('@siiges-services/shared');

const createFormacionDirector = (
  createFormacionDirectorQuery,
  findOneFormacionDirectorQuery,
  findOneNivelQuery,
) => async (identifierObj) => {
  const { directorId, ...data } = identifierObj;
  const { nivelId } = data;

  // Validations
  const director = await findOneFormacionDirectorQuery({ id: directorId });
  checkers.throwErrorIfDataIsFalsy(director, 'Director', directorId);
  const nivel = await findOneNivelQuery({ id: nivelId });
  checkers.throwErrorIfDataIsFalsy(nivel, 'Nivel', nivelId);

  const dataBody = {
    directorId,
    formacion: data,
  };
  const include = [{
    association: 'formacion',
  }];

  const { formacion } = await createFormacionDirectorQuery(dataBody, include);

  return formacion;
};

module.exports = { createFormacionDirector };
