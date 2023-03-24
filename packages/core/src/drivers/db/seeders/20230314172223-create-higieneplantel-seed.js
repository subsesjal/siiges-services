const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PLANTEL_HIGIENE_TABLE } = require('../models/plantelhigiene');

const plantelhigieneCSV = path.join(__dirname, '../CSVFiles/plantelhigiene.csv');

module.exports = {
  async up(queryInterface) {
    const plantelhigieneJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(plantelhigieneCSV);

    await queryInterface.bulkInsert(PLANTEL_HIGIENE_TABLE, plantelhigieneJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PLANTEL_HIGIENE_TABLE, null, {});
  },
};
