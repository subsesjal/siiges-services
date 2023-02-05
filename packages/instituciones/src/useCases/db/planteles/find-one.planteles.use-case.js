const { checkers } = require('@siiges-services/shared');

const findOnePlantel = (findOneInstitucionQuery, findOnePlantelQuery) => async (
  identifierObj,
) => {
  const { plantelId, institucionId } = identifierObj;

  const institucion = await findOneInstitucionQuery({ id: institucionId });
  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', institucionId);

  const include = [
    {
      association: 'domicilio',
      include: [
        { association: 'estado' },
        { association: 'municipio' },
      ],
    },
    {
      association: 'directores',
      include: [{ association: 'persona' }],
    },
    { association: 'institucion' }];

  const plantel = await findOnePlantelQuery({
    id: plantelId,
    institucionId,
  }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  return plantel;
};

module.exports = findOnePlantel;
