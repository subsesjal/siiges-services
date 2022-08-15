const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PAIS_TABLE } = require('../models/pais');

const paisesCSV = path.join(__dirname, '../CSVFiles/paises.csv');

module.exports = {
  async up(queryInterface) {
    const paisesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(paisesCSV);

    await queryInterface.bulkInsert(PAIS_TABLE, paisesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PAIS_TABLE, null, {});
  },
};
