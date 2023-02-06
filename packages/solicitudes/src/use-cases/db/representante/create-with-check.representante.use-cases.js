// External dependencies
const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
// Internal dependencies
const { create, findOne } = require('./db');

async function createWithCheck(identifierObj, data) {
  const previousRepresentative = await findOne(identifierObj);
  if (checkers.isTruthy(previousRepresentative)) throw boom.conflict('There is already a representative for this solicitud');

  const representative = await create(data);

  return representative;
}

module.exports = createWithCheck;
