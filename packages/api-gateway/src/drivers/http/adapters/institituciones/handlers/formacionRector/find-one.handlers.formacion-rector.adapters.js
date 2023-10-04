const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findOneFormacionRector(req, reply) {
  try {
    const { params } = req;

    Logger.info('[Formacion]: Update Formacion rector');

    const findFormacionRector = await this.institucionServices.findOneFormacionRector({
      ...params,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: findFormacionRector });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findOneFormacionRector };
