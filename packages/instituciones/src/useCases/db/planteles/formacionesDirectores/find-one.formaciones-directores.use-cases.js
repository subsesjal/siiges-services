const { checkers } = require('@siiges-services/shared');

const findOneFormacionDirector = (
  findOneDirectorQuery,
  findOneFormacionDirectorQuery,
) => async (identifierObj) => {
  const { directorId: id, formacionId } = identifierObj;
  const findRector = await findOneDirectorQuery({ id });

  checkers.throwErrorIfDataIsFalsy(findRector, 'Director', id);

  const include = [{
    association: 'formacion',
  }];
  const findFormacion = await findOneFormacionDirectorQuery(identifierObj, { include });
  checkers.throwErrorIfDataIsFalsy(findFormacion, 'Formacion', formacionId);

  return findFormacion.formacion;
};

module.exports = { findOneFormacionDirector };
