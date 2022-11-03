const { findOne, update } = require('./db');

async function updateAndFind(identifierObj, changes) {
  await update(identifierObj, changes);
  const representativeUpdated = await findOne(changes);

  return representativeUpdated;
}

module.exports = updateAndFind;
