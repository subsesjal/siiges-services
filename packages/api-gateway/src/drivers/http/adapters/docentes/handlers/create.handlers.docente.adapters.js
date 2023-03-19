const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function createDocente(req, reply) {
  try {
    const { ...data } = req.body;

    Logger.info('[docente]: Creating docente');

    const newDocente = await this.solicitudServices.createDocente(data);

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newDocente });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = createDocente;
