const { checkers } = require('@siiges-services/shared');

const findAllFormacionDirector = (
  findOneFormacionDirectorQuery,
  findAllFormacionQuery,
) => async (identifierObj) => {
  // Find validator
  const findFormacionRector = await findOneFormacionDirectorQuery(identifierObj, { attributes: ['formacionId'] });
  checkers.throwErrorIfDataIsFalsy(!!findFormacionRector.length, 'Director', identifierObj.directorId);

  // create array with rectorId [1,3,5,...]
  const formacionDirectorIds = findFormacionRector.map((formacion) => formacion.formacionId);

  const where = {
    id: formacionDirectorIds,
  };
  const findAllFormacion = await findAllFormacionQuery(where);

  return findAllFormacion;
};

module.exports = { findAllFormacionDirector };
