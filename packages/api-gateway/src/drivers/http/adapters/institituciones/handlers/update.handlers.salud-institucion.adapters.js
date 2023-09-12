const errorHandler = require('../../../utils/errorHandler');

async function updateSaludInstitucion(req, reply) {
  try {
    const { institucionesSaludId } = req.params;
    const { body } = req;

    const saludInstitucion = await this.institucionServices
      .updateSaludInstitucion({ id: institucionesSaludId, body });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: saludInstitucion });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { updateSaludInstitucion };
