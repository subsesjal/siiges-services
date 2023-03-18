const { Logger } = require('@siiges-services/shared');

const find = (findGroupQuery) => async (identifierObj) => {
  const { query } = identifierObj;

  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  }];

  Logger.info('[diligence/find] Searching all diligences in a solicitud');
  const diligencia = await findGroupQuery(null, { query, include });

  return diligencia;
};

module.exports = find;
