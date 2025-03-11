const boom = require('@hapi/boom');

const findOneTokenRecoveryPassword = (
  findOneTokenRecoveryPasswordQuery,
) => async ({ token }) => {
  const tokenRecoveryPassword = await findOneTokenRecoveryPasswordQuery({ token });

  if (!tokenRecoveryPassword) {
    throw boom.notFound('El token no existe');
  }

  if (tokenRecoveryPassword.dataValues.isUsed) {
    throw boom.badRequest('El token ya fue utilizado');
  }

  if (tokenRecoveryPassword.dataValues.expiresAt < new Date()) {
    throw boom.badRequest('El token ha expirado');
  }

  return { userId: +tokenRecoveryPassword.dataValues.usuarioId };
};

module.exports = { findOneTokenRecoveryPassword };
