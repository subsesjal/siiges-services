const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findOneFormacionDirector(req, reply) {
  try {
    const { params } = req;

    Logger.info('[Formacion]: Update Formacion rector');

    const findOneFormacionDiRector = await this.institucionServices.findOneFormacionDirector({
      ...params,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: findOneFormacionDiRector });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneFormacionDirector };
