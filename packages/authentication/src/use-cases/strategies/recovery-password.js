const crypto = require('crypto');
const { config } = require('@siiges-services/notificaciones');
const boom = require('@hapi/boom');

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

const tokenRecoveryPassword = (
  findOneUserQuery,
  createTokenRecoveryPasswordQuery,
) => async ({ correo, usuario }) => {
  const [correoData, usuarioData] = await Promise.all([
    await findOneUserQuery({ correo }),
    await findOneUserQuery({ usuario }),
  ]);
  const usuarioFound = correoData || usuarioData;

  if (!usuarioFound) {
    throw boom.notFound(`El usuario con correo: ${correo}, no existe`);
  }

  if (!usuarioFound.dataValues.estatus) {
    throw boom.unauthorized();
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + config.TimeMail || 3600000);
  const createTokenRecoveryPassword = await createTokenRecoveryPasswordQuery({
    usuarioId: usuarioFound.id,
    token,
    expiresAt,
  });

  return {
    ...createTokenRecoveryPassword.dataValues,
    usuario: usuarioFound.usuario,
    usuarioId: usuarioFound.id,
  };
};

module.exports = { tokenRecoveryPassword };
