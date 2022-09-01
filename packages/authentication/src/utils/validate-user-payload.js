// External dependencies
const boom = require('@hapi/boom');
const { checkers, Logger } = require('@siiges-services/shared');

function validateUserPayload({ usuario, rol }) {
  if (checkers.isNotString(usuario)) {
    Logger.error('[auth/signUserToken] usuario must be a string');
    throw boom.badData(`[signUserToken] "usuario" is not string. \
Pass ${typeof usuario} instead`);
  }
  if (checkers.isNotString(rol)) {
    Logger.error('[auth/signUserToken] rol must be a string');
    throw boom.badData(`[signUserToken] "rol" is not string. \
Pass ${typeof rol} instead`);
  }
}

module.exports = validateUserPayload;
