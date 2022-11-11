const { Logger } = require('@siiges-services/shared');

const update = (updateQuery) => async (identifierObj, changes) => {
  Logger.info('[solicitudes/update]: Updating solicitud');
  const solicitudUpdated = await updateQuery(identifierObj, changes);
  Logger.info('[solicitudes/update] A solicitud was updated');

  return solicitudUpdated;
};

module.exports = update;
