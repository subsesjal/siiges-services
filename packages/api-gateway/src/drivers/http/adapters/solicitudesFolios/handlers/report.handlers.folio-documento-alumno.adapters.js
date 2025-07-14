const { Logger } = require('@siiges-services/shared');
const { Parser } = require('json2csv');
const errorHandler = require('../../../utils/errorHandler');

async function reportFolioDocumentoAlumno(req, reply) {
  try {
    const reqQuery = req.query;

    Logger.info('[solicitudes]: Getting CSV');
    const reporte = await this.solicitudFolioServices.reportFolioDocumentoAlumno(reqQuery);

    const parser = new Parser();
    const csv = parser.parse(reporte);

    return reply
      .code(200)
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename="libro.csv"')
      .send(Buffer.from(csv, 'utf-8'));
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = { reportFolioDocumentoAlumno };
