const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findAllFormacionDirector(req, reply) {
  try {
    const { params } = req;

    Logger.info('[Formacion]: Update Formacion rector');

    const findAllFormacionDiRector = await this.institucionServices.findAllFormacionDirector({
      ...params,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: findAllFormacionDiRector });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAllFormacionDirector };
