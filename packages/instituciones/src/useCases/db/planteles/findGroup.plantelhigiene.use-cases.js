const { Logger } = require('@siiges-services/shared');

const findGroupPlantelHigiene = (findGroupQuery) => async (identifierObj) => {
  const { query } = identifierObj;

  console.log('hola aqui estoy');
  console.log(identifierObj);

  const include = [{
    association: 'plantel',
    include: [{ association: 'higiene' }],
  }];

  Logger.info('[plantel/find] Searching all higiene in a plantel');
  const plantel = await findGroupQuery(null, { query, include });

  return plantel;
};

module.exports = findGroupPlantelHigiene;
