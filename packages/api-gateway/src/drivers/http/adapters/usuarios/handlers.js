const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../utils/errorHandler');

// usuario services
async function findAllUsuarios(req, reply) {
  try {
    Logger.info('[usuarios]: Getting usuarios list');
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

    Logger.info(`[usuarios]: Getting usuario ${usuarioId}`);
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

    Logger.info(`[usuarios]: Getting usuario: ${usuarioId}`);
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

    Logger.info('[usuarios]: Creating usuario');
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
    Logger.info('[usuarios]: Updating usuario');

    const { usuarioId } = req.params;
    const { fotoPerfil, planMejora, ...data } = req.body;

    let usuarioUpdated = await this.usuarioServices.updateUsuario(
      usuarioId,
      data,
    );

    const files = [];

    if (fotoPerfil) {
      if (usuarioUpdated.personaId) {
        files.push({
          file: fotoPerfil,
          dataFile: {
            tipoEntidad: 'PERSONA',
            entidadId: usuarioUpdated.personaId,
            tipoDocumento: 'FOTOGRAFIA_PERSONA',
          },
        });
      }
    }

    if (planMejora) {
      files.push({
        file: planMejora,
        dataFile: {
          tipoEntidad: 'PROGRAMA',
          entidadId: usuarioId,
          tipoDocumento: 'PLAN_MEJORA',
        },
      });
    }

    const filesUploaded = await this.fileServices.upload(files);

    usuarioUpdated = await this.usuarioServices.updateUsuario(
      usuarioId,
      { persona: { fotografia: filesUploaded.fotografia.path } },
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
