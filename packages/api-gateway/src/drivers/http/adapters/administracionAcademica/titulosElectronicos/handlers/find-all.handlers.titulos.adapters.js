const { Logger } = require('@siiges-services/shared');
const errorHandler = require('../../../../utils/errorHandler');

async function findAllTitulos(req, reply) {
  try {
    Logger.info('[TitulosElectronicos]: findTitulos - Request received');
    const { numeroRvoe } = req.query;

    const titulos = await this.administracionAcademicaServices.findAllTitulos({ numeroRvoe });

    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ data: titulos });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { findAll: findAllTitulos };
