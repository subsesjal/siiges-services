const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../utils/errorHandler');

// instituciones services
async function findAllInstituciones(req, reply) {
  try {
    Logger.info('[instituciones]: Getting instituciones list');
    const instituciones = await this.institucionServices.findAllInstituciones();

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: instituciones });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findOneInstitucion(req, reply) {
  try {
    const { institucionId } = req.params;

    Logger.info(`[instituciones]: Getting institución ${institucionId}`);
    const institucion = await this.institucionServices.findOneInstitucion(institucionId);

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: institucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function createInstitucion(req, reply) {
  try {
    const { body } = req;

    Logger.info('[instituciones]: Creating institucion');

    const newInstitucion = await this.institucionServices.createInstitucion(body);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newInstitucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function updateInstitucion(req, reply) {
  try {
    Logger.info('[instituciones]: Updating institucion');

    const { institucionId } = req.params;
    const { ...data } = req.body;

    const institucionUpdated = await this.institucionServices.updateInstitucion(
      { id: institucionId },
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: institucionUpdated });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function deleteInstitucion(req, reply) {
  try {
    const { institucionId } = req.params;

    Logger.info(`[instituciones]: Deleting institucion: ${institucionId}`);
    const institucionDeleted = await this.institucionServices.deleteInstitucion({
      id: institucionId,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: institucionDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findAllPlantelesInstitucion(req, reply) {
  try {
    const { institucionId } = req.params;

    Logger.info(`[instituciones]: Getting institucion with id ${institucionId} and its planteles list`);
    const plantelesInstitucion = await this.institucionesServices.findAllPlantelesInstitucion(
      institucionId,
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelesInstitucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function createPlantelInstitucion(req, reply) {
  try {
    const { institucionId } = req.params;
    const { body } = req;

    Logger.info('[instituciones]: Creating plantel in institucion');
    const newPlantel = await this.institucionesServices.createPlantelInstitucion(
      institucionId,
      body,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newPlantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

/*
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
 */

module.exports = {
  findAllInstituciones,
  findOneInstitucion,
  createInstitucion,
  updateInstitucion,
  deleteInstitucion,
  findAllPlantelesInstitucion,
  createPlantelInstitucion,
};
