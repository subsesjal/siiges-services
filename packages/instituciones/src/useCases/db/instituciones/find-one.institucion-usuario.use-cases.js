const { checkers } = require('@siiges-services/shared');

const findOneInstitucionUsuario = (findOneInstitucionQuery) => async (
  identifierObj,
  attributes,
) => {
  const { usuarioId } = identifierObj;
  const include = [
    {
      association: 'ratificacionesNombre',
      limit: 1,
      order: [['createdAt', 'DESC']],
    },
    {
      association: 'rector',
      include: [{ association: 'persona' }],
    },
    {
      association: 'planteles',
      include: [
        {
          association: 'domicilio',
          include: [{ association: 'estado' }, { association: 'municipio' }],
        },
        {
          association: 'directores',
          include: [{ association: 'persona' }],
        }],
    },
  ];

  const institucion = await findOneInstitucionQuery({ usuarioId }, {
    attributes,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', usuarioId);

  return institucion;
};

module.exports = findOneInstitucionUsuario;
