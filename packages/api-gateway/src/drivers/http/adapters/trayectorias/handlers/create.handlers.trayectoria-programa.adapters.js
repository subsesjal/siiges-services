const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

// solicitudes services
async function createTrayectoriaPrograma(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[solicitudes]: Creating trayectoria-programa');

    const newTrayectoria = await this.solicitudServices.createTrayectoriaPrograma(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newTrayectoria });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createTrayectoriaPrograma;
