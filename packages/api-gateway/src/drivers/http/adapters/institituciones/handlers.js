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
    const institucion = await this.institucionServices.findOneInstitucion({ id: institucionId });

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
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating institucion');

    const newInstitucion = await this.institucionServices.createInstitucion(data);

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
      .code(204)
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
      .code(204)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: institucionDeleted });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findPlantelesInstitucion(req, reply) {
  try {
    const { institucionId } = req.params;

    Logger.info(`[instituciones]: Getting institucion with id ${institucionId} and its planteles list`);

    const plantelesInstitucion = await this.institucionServices.findPlantelesInstitucion(
      { id: institucionId },
    );

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantelesInstitucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findOnePlantel(req, reply) {
  try {
    const { institucionId, plantelId } = req.params;

    Logger.info(`[instituciones]: Getting plantel ${plantelId}`);

    const plantel = await this.institucionServices.findOnePlantel({
      institucionId,
      plantelId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function createPlantel(req, reply) {
  try {
    const { institucionId } = req.params;
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating plantel in institucion');

    const opts = [
      { association: 'domicilio' },
    ];

    const newPlantel = await this.institucionServices.createPlantel(
      institucionId,
      data,
      opts,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newPlantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function updatePlantel(req, reply) {
  try {
    const { institucionId, plantelId } = req.params;
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating plantel in institucion');
    const newPlantel = await this.institucionServices.updatePlantel(
      { institucionId, plantelId },
      data,
    );

    return reply
      .code(204)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newPlantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function deletePlantel(req, reply) {
  try {
    const { institucionId, plantelId } = req.params;

    Logger.info(`[instituciones]: Deleting plantel ${plantelId}`);

    const plantel = await this.institucionServices.deletePlantel({
      institucionId,
      plantelId,
    });

    return reply
      .code(204)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function createRatificacionNombre(req, reply) {
  try {
    const { institucionId } = req.params;
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating ratificacion de nombre');

    const ratificacionNombre = await this.institucionServices.createRatificacionNombre(
      institucionId,
      data,
    );

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ratificacionNombre });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function updateRatificacionNombre(req, reply) {
  try {
    const { institucionId, ratificacionId } = req.params;
    const { ...data } = req.body;

    Logger.info('[instituciones]: Creating ratificacion de nombre');

    const ratificacionNombre = await this.institucionServices.updateRatificacionNombre(
      { institucionId, ratificacionId },
      data,
    );

    return reply
      .code(204)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ratificacionNombre });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function findOneRatificacionNombre(req, reply) {
  try {
    const { institucionId, ratificacionId } = req.params;

    Logger.info(`[instituciones]: Getting ratificacion ${ratificacionId}`);

    const plantel = await this.institucionServices.findOneRatificacionNombre({
      institucionId,
      ratificacionId,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: plantel });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

async function deleteRatificacionNombre(req, reply) {
  try {
    const { institucionId, ratificacionId } = req.params;

    Logger.info(`[instituciones]: Deleting ratificacion ${ratificacionId}`);

    const ratificacionNombre = await this.institucionServices.deleteRatificacionNombre({
      institucionId,
      ratificacionId,
    });

    return reply
      .code(204)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: ratificacionNombre });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = {
  findAllInstituciones,
  findOneInstitucion,
  findPlantelesInstitucion,
  createInstitucion,
  updateInstitucion,
  deleteInstitucion,
  findOnePlantel,
  createPlantel,
  updatePlantel,
  deletePlantel,
  findOneRatificacionNombre,
  createRatificacionNombre,
  updateRatificacionNombre,
  deleteRatificacionNombre,
};
