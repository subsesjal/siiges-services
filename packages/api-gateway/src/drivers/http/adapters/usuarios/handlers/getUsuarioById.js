const errorHandler = require("./errorHandler");

async function getUsuarioById(req, reply) {
  try {
    const { usuarioId } = req.params;
    req.log.info(`[http-server]: Getting usuario: ${usuarioId}`);

    const usuario = await this.usuarioServices.getById(usuarioId);

    return reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ data: usuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = getUsuarioById;
