const { Logger } = require('@siiges-services/shared');

const create = (createQuery) => async (data) => {
  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  }];

  Logger.info('[diligencia/create]: Creating diligencia');
  const diligence = await createQuery(data, include);
  Logger.info('[diligencia/create]: Diligencia created');

  return diligence;
};

module.exports = create;
