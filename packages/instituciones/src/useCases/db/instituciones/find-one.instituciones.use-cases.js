const { checkers } = require('@siiges-services/shared');

const findOneInstitucion = (findOneInstitucionQuery) => async (
  identifierObj,
  attributes,
) => {
  const include = [
    { association: 'ratificacionesNombre' },
    {
      association: 'rector',
      include: [{ association: 'persona' }],
    },
  ];

  const institucion = await findOneInstitucionQuery(identifierObj, {
    attributes,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', identifierObj.id);

  return institucion;
};

module.exports = findOneInstitucion;
