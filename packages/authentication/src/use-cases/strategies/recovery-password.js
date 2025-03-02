const crypto = require('crypto');
const boom = require('@hapi/boom');

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

const tokenRecoveryPassword = (
  findOneUserQuery,
  createTokenRecoveryPasswordQuery,
) => async ({ correo }) => {
  const usuarioFound = await findOneUserQuery({ correo });

  if (!usuarioFound) {
    throw boom.notFound(`El usuario con correo: ${correo}, no existe`);
  }

  if (!usuarioFound.dataValues.estatus) {
    throw boom.unauthorized();
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 3600000);
  const createTokenRecoveryPassword = await createTokenRecoveryPasswordQuery({
    usuarioId: usuarioFound.id,
    token,
    expiresAt,
  });

  return {
    ...createTokenRecoveryPassword,
    usuario: usuarioFound.usuario,
    usuarioId: usuarioFound.id,
  };
};

module.exports = { tokenRecoveryPassword };
