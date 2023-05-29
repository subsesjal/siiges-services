// Internal dependencies
const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function loginUser(req, reply) {
  try {
    const { usuario, contrasena } = req.body;
    Logger.info(`[auth]: User Logged in: ${usuario}`);

    const usuarioFound = await this.authServices.localStrategy({ usuario, contrasena });
    Logger.info('[api/usuarios/findOne]: the usuario was found');

    const userPayload = await this.authServices.jwtAdapter.createUserTokenPayload(usuarioFound);
    const token = this.jwt.sign({ userPayload });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuarioFound, token });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = loginUser;
