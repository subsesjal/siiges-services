const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createFormacionDirector(req, reply) {
  try {
    const directorId = req.params;
    const { body: data } = req;

    Logger.info('[Formacion]: Creating Formacion director');

    const newFormacionDirector = await this.institucionServices.createFormacionDirector({
      ...data,
      ...directorId,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newFormacionDirector });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createFormacionDirector };
