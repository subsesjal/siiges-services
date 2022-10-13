const { checkers } = require('@siiges-services/shared');

const findOneInstitucion = (findOneInstitucionQuery) => async (
  identifierObj,
  attributes,
) => {
  const include = [{ association: 'ratificacionesNombre' }];

  const institucion = await findOneInstitucionQuery(identifierObj, {
    attributes,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(institucion);

  return institucion;
};

module.exports = findOneInstitucion;
