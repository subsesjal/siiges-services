const { Logger } = require('@siiges-services/shared');

const update = (updateQuery) => async (identifierObj, changes) => {
  Logger.info(`[update/persona]: Updating person with identifier ${identifierObj}`);
  const persona = await updateQuery(identifierObj, changes);
  Logger.info('[update/personad] Persona was updated');

  return persona;
};

module.exports = update;
