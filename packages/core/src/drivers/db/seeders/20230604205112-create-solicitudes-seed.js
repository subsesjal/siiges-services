const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { SOLICITUD_TABLE } = require('../models/solicitud');

const solicitudesCSV = path.join(__dirname, '../CSVFiles/solicitudes.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const solicitudesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(solicitudesCSV);

    return queryInterface.bulkInsert(SOLICITUD_TABLE, solicitudesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SOLICITUD_TABLE, null, {});
  },
};
