const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { SOLICITUD_TABLE } = require('../models/solicitud');

const solicitudesCSV = path.join(__dirname, '../CSVFiles/solicitudes.csv');

module.exports = {
  async up(queryInterface) {
    const solicitudesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(solicitudesCSV);

    await queryInterface.bulkInsert(SOLICITUD_TABLE, solicitudesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SOLICITUD_TABLE, null, {});
  },
};
