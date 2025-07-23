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
  let correoData;
  let usuarioData;
  if (correo) {
    correoData = await findOneUserQuery({ correo });
  }
  if (usuario) {
    usuarioData = await findOneUserQuery({ usuario });
  }
  const usuarioFound = correoData || usuarioData;

  if (!usuarioFound) {
    throw boom.notFound(`El usuario con correo: ${correo}, no existe`);
  }

  if (!usuarioFound.dataValues.estatus) {
    throw boom.unauthorized();
  }

  const token = generateToken();

  const expiresAt = new Date(Date.now() + parseInt(config.TimeMail, 10) || 3600000);
  const createTokenRecoveryPassword = await createTokenRecoveryPasswordQuery({
    usuarioId: usuarioFound.id,
    token,
    expiresAt,
  });

  return {
    ...createTokenRecoveryPassword.dataValues,
    usuario: usuarioFound.usuario,
    usuarioId: usuarioFound.id,
    usuarioCorreo: usuarioFound.correo,
  };
};

module.exports = { tokenRecoveryPassword };
