const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { ESTATUS_SOLICITUD_TABLE } = require('../models/estatusSolicitud');

const estatusSolicitudesCSV = path.join(__dirname, '../CSVFiles/estatus_solicitudes.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusSolicitudesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusSolicitudesCSV);

    return queryInterface.bulkInsert(ESTATUS_SOLICITUD_TABLE, estatusSolicitudesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_SOLICITUD_TABLE, null, {});
  },
};
