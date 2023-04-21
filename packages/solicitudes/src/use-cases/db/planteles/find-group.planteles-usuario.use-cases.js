const { checkers } = require('@siiges-services/shared');

const findGroupPlantelesUsuario = (findOneInstitucionQuery) => async (identifierObj) => {
  const { usuarioId } = identifierObj;

  const include = [
    {
      association: 'planteles',
      include: [
        {
          association: 'domicilio',
          include: [{ association: 'estado' }, { association: 'municipio' }],
        },
      ],
    }];

  const institucion = await findOneInstitucionQuery({ usuarioId }, {
    undefined,
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(institucion);

  return institucion.dataValues.planteles;
};

module.exports = findGroupPlantelesUsuario;
