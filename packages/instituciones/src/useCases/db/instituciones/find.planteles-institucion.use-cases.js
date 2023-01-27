const { checkers } = require('@siiges-services/shared');

const findPlantelesInstitucion = (findOneInstitucionQuery) => async (identifierObj) => {
  const include = [
    { association: 'ratificacionesNombre' },
    {
      association: 'planteles',
      include: [
        {
          association: 'domicilio',
          include: [{ association: 'estado' }, { association: 'municipio' }],
        },
      ],
    },
  ];

  const plantelesInstitucion = await findOneInstitucionQuery(identifierObj, {
    undefined,
    include,
  });
  checkers.throwErrorIfDataIsFalsy(plantelesInstitucion);

  return plantelesInstitucion;
};

module.exports = findPlantelesInstitucion;
