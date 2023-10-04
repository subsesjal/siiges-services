const { checkers } = require('@siiges-services/shared');

const findAllFormacionRector = (
  findOneFormacionRectorQuery,
  findAllFormacionQuery,
) => async (identifierObj) => {
  // Find validator
  const findFormacionRector = await findOneFormacionRectorQuery(identifierObj, { attributes: ['formacionId'] });
  checkers.throwErrorIfDataIsFalsy(!!findFormacionRector.length, 'Rector', identifierObj.rectorId);

  // create array with rectorId [1,3,5,...]
  const formacionRectorIds = findFormacionRector.map((formacion) => formacion.formacionId);

  const where = {
    id: formacionRectorIds,
  };
  const findAllFormacion = await findAllFormacionQuery(where);

  return findAllFormacion;
};

module.exports = { findAllFormacionRector };
