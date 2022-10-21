const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { CICLO_TABLE } = require('../models/ciclo');

const ciclosCSV = path.join(__dirname, '../CSVFiles/ciclos.csv');

module.exports = {
  async up(queryInterface) {
    const ciclosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(ciclosCSV);

    await queryInterface.bulkInsert(CICLO_TABLE, ciclosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CICLO_TABLE, null, {});
  },
};
