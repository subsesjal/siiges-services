const errorHandler = require('../../utils/errorHandler');

// usuario services
async function findAllUsuarios(req, reply) {
  try {
    req.log.info('[http-server]: Getting usuarios list: ');

    const usuarios = await this.usuarioServices.findAllUsuarios();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuarios });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findOneUsuario(req, reply) {
  try {
    const { usuarioId } = req.params;
    req.log.info(`[http-server]: Getting usuario: ${usuarioId}`);

    const usuario = await this.usuarioServices.findOneUsuario(usuarioId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findOneDetailedUsuario(req, reply) {
  try {
    const { usuarioId } = req.params;
    req.log.info(`[http-server]: Getting usuario: ${usuarioId}`);

    const usuario = await this.usuarioServices.findOneUsuarioDetailed(
      usuarioId,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function createUsuario(req, reply) {
  try {
    const { body } = req;
    req.log.info('[http-server]: Creating usuario');

    const newUsuario = await this.usuarioServices.createUsuario(body);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newUsuario });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function updateUsuario(req, reply) {
  try {
    const { usuarioId } = req.params;
    const { body } = req;
    req.log.info('[http-server]: Updating usuario');

    const usuarioUpdated = await this.usuarioServices.updateUsuario(
      usuarioId,
      body,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuarioUpdated });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function deleteUsuario(req, reply) {
  try {
    const { usuarioId } = req.params;
    req.log.info('[http-server]: Deleting usuario');

    const usuarioDeleted = await this.usuarioServices.deleteUsuario(usuarioId);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: usuarioDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  findAllUsuarios,
  findOneUsuario,
  findOneDetailedUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
