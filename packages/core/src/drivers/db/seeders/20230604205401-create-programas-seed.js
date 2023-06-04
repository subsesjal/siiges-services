const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PROGRAMA_TABLE } = require('../models/programa');

const programasCSV = path.join(__dirname, '../CSVFiles/programas.csv');

module.exports = {
  async up(queryInterface) {
    const programasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(programasCSV);

    await queryInterface.bulkInsert(PROGRAMA_TABLE, programasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PROGRAMA_TABLE, null, {});
  },
};
