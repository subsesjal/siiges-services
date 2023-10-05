const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function createFormacionRector(req, reply) {
  try {
    const rectorId = req.params;
    const { body: data } = req;

    Logger.info('[Formacion]: Creating Formacion rector');

    const newFormacionRector = await this.institucionServices.createFormacionRector({
      ...data,
      ...rectorId,
    });

    return reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: newFormacionRector });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { createFormacionRector };
