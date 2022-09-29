const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PLANTEL_TABLE } = require('../models/plantel');

const plantelesCSV = path.join(__dirname, '../CSVFiles/planteles.csv');

module.exports = {
  async up(queryInterface) {
    const plantelesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(plantelesCSV);

    await queryInterface.bulkInsert(PLANTEL_TABLE, plantelesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PLANTEL_TABLE, null, {});
  },
};
