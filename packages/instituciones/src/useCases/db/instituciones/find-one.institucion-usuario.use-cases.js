const { checkers } = require('@siiges-services/shared');

const findOneInstitucionUsuario = (findOneInstitucionQuery) => async (
  identifierObj,
  attributes,
) => {
  const { usuarioId } = identifierObj;
  const include = [
    { association: 'ratificacionesNombre' },
    {
      association: 'rector',
      include: [{ association: 'persona' }],
    },
  ];

  const institucion = await findOneInstitucionQuery({ usuarioId }, {
    attributes,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(institucion);

  return institucion;
};

module.exports = findOneInstitucionUsuario;
