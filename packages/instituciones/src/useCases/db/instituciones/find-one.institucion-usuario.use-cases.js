const { checkers } = require('@siiges-services/shared');

const findOneInstitucionUsuario = (
  findOneInstitucionQuery,
  findOneUsuarioUsuarioQuery,
  findOneUsuarioQuery,
) => async (
  identifierObj,
  attributes,
) => {
  let { usuarioId } = identifierObj;
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

  const { rolId } = await findOneUsuarioQuery({ id: usuarioId });
  if (rolId === 4 || rolId === 12) {
    const { principalId } = await findOneUsuarioUsuarioQuery({ secundarioId: usuarioId });
    if (principalId) {
      usuarioId = principalId;
    }
  }

  const institucion = await findOneInstitucionQuery({ usuarioId }, {
    attributes,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', usuarioId);

  return institucion;
};

module.exports = findOneInstitucionUsuario;
