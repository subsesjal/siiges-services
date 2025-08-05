const { checkers } = require('@siiges-services/shared');

const findOnePlantelInfraestructura = (
  findOneInfraestructuraQuery,
) => async (identifierObj) => {
  const { plantelId, infraestructuraId } = identifierObj;

  const include = [
    { association: 'tipoInstalacion' },
    {
      association: 'asignaturasInfraestructura',
      include: [
        { association: 'asignatura' },
      ],
    }];

  const plantelInfraestructura = await findOneInfraestructuraQuery({
    id: infraestructuraId,
    plantelId,
  }, {
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(plantelInfraestructura, 'infraestructura', infraestructuraId);

  return plantelInfraestructura;
};

module.exports = findOnePlantelInfraestructura;
