const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INFRAESTRUCTURA_TABLE } = require('../models/infraestructura');

const infraestructurasCSV = path.join(__dirname, '../CSVFiles/infraestructuras.csv');

module.exports = {
  async up(queryInterface) {
    const infraestructurasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(infraestructurasCSV);

    await queryInterface.bulkInsert(INFRAESTRUCTURA_TABLE, infraestructurasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INFRAESTRUCTURA_TABLE, null, {});
  },
};
