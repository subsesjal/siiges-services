const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function updateFormacionDirector(req, reply) {
  try {
    const { params } = req;
    const { body: data } = req;

    Logger.info('[Formacion]: Update Formacion rector');

    const updateFormacionDiRector = await this.institucionServices.updateFormacionDirector({
      ...data,
      ...params,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: updateFormacionDiRector });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateFormacionDirector };
