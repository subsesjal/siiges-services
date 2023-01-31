const { checkers } = require('@siiges-services/shared');

const findOnePlantel = (findOneInstitucionQuery, findOnePlantelQuery) => async (
  identifierObj,
) => {
  const { plantelId, institucionId } = identifierObj;

  const institucion = await findOneInstitucionQuery({ id: institucionId });
  checkers.throwErrorIfDataIsFalsy(institucion);

  const include = [
    {
      association: 'directores',
      include: [{ association: 'persona' }],
    },
    {
      association: 'domicilio',
      include: [
        { association: 'estado' },
        { association: 'municipio' },
      ],
    },
    { association: 'institucion' }];

  const plantel = await findOnePlantelQuery({
    id: plantelId,
    institucionId,
  }, { undefined, include });
  checkers.throwErrorIfDataIsFalsy(plantel);

  return plantel;
};

module.exports = findOnePlantel;
