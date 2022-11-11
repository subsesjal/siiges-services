const { Logger } = require('@siiges-services/shared');

const create = (createQuery) => async (data) => {
  Logger.info('[representante/create]: Creating representante');
  const representative = await createQuery(data);
  Logger.info('[representante/create] A representante was created');

  return representative;
};

module.exports = create;
