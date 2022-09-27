const { checkers } = require('@siiges-services/shared');

const findOneInstitucion = (findOneInstitucionQuery) => async (
  identifierObj,
  attributes,
  include,
) => {
  const institucion = await findOneInstitucionQuery(identifierObj, { attributes, include });
  checkers.throwErrorIfDataIsFalsy(institucion);
  return institucion;
};

module.exports = findOneInstitucion;
