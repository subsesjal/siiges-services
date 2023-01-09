const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../utils/errorHandler');

// usuario services
async function findAllUsuarios(req, reply) {
  try {
    Logger.info('[usuarios]: Getting usuarios list');
    const usuarios = await this.usuarioServices.findAllUsers();

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

    Logger.info(`[usuarios]: Getting usuario ${usuarioId}`);

    const opts = [
      {
        association: 'persona',
      },
    ];

    const usuario = await this.usuarioServices.findOneUser({ id: usuarioId }, '', opts);

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

    Logger.info(`[usuarios]: Getting usuario: ${usuarioId}`);

    const usuario = await this.usuarioServices.findOneUserDetail({ id: usuarioId });

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

    Logger.info('[usuarios]: Creating usuario');

    const newUsuario = await this.usuarioServices.createUser(body);

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
    Logger.info('[usuarios]: Updating usuario');

    const { usuarioId } = req.params;
    const { ...data } = req.body;

    const usuarioUpdated = await this.usuarioServices.updateUser(
      usuarioId,
      data,
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

    Logger.info(`[usuarios]: Deleting usuario: ${usuarioId}`);
    const usuarioDeleted = await this.usuarioServices.deleteUser(usuarioId);

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
