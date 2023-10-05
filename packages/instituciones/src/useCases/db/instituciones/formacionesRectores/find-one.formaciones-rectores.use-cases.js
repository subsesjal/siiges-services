const { checkers } = require('@siiges-services/shared');

const findOneFormacionRector = (
  findOneRectorQuery,
  findOneFormacionRectorQuery,
) => async (identifierObj) => {
  const { rectorId: id, formacionId } = identifierObj;
  const include = [{
    association: 'formacion',
  }];

  const findRector = await findOneRectorQuery({ id });
  checkers.throwErrorIfDataIsFalsy(findRector, 'Rector', id);

  const findFormacion = await findOneFormacionRectorQuery(identifierObj, { include });
  checkers.throwErrorIfDataIsFalsy(findFormacion, 'Formacion', formacionId);

  return findFormacion.formacion;
};

module.exports = { findOneFormacionRector };
