// External dependencies
const boom = require('@hapi/boom');
const { checkers, Logger } = require('@siiges-services/shared');

function validateUserPayload(userPayload) {
  if (checkers.isNotNumber(userPayload.id)) {
    Logger.error('[auth/signUserToken] usuarioId must be a number');
    throw boom.badData(`[signUserToken] "usuarioId" is not number. \
Pass ${typeof userPayload.id} instead`);
  }

  if (checkers.isNotString(userPayload.dataValues.rol.nombre)) {
    Logger.error('[auth/signUserToken] rol must be a string');
    throw boom.badData(`[signUserToken] "rol" is not string. \
Pass ${typeof userPayload.dataValues.rol.nombre} instead`);
  }

  if (checkers.isNotString(userPayload.usuario)) {
    Logger.error('[auth/signUserToken] usuario must be a string');
    throw boom.badData(`[signUserToken] "usuario" is not string. \
Pass ${typeof userPayload.usuario} instead`);
  }

  return {
    id: userPayload.id,
    rol: userPayload.dataValues.rol.nombre,
    usuario: userPayload.usuario,
  };
}

module.exports = validateUserPayload;
