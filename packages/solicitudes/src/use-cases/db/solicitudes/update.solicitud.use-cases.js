const { Logger } = require('@siiges-services/shared');

const update = (updateQuery) => async (identifierObj, changes) => {
  Logger.info('[solicitudes/update]: Updating solicitudes');
  const solicitud = await updateQuery(identifierObj, changes);
  Logger.info('[solicitudes/update]: solicitudes updated');

  return solicitud;
};

module.exports = update;
