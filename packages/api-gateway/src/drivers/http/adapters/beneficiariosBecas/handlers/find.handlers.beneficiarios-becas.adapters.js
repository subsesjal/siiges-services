const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../utils/errorHandler');

async function findBeneficiariosBecas(req, reply) {
  try {
    Logger.info('[Beneficiarios-Becas]: Getting beneficiarios becas list');
    const { correo } = req.query;

    const beneficiarios = await this.solicitudBecaServices
      .findBeneficiariosBecas({ correo });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: beneficiarios.data, headers: beneficiarios.headers });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findBeneficiariosBecas };
