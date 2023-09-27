const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function updateFormacionRector(req, reply) {
  try {
    const { params } = req;
    const { body: data } = req;

    Logger.info('[Formacion]: Update Formacion rector');

    const FormacionRector = await this.institucionServices.updateFormacionRector({
      ...data,
      ...params,
    });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: FormacionRector });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateFormacionRector };
