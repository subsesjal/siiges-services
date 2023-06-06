const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PLANTEL_HIGIENE_TABLE } = require('../models/plantelHigiene');

const plantelesHigienesCSV = path.join(__dirname, '../CSVFiles/planteles_higienes.csv');

module.exports = {
  async up(queryInterface) {
    const plantelesHigienesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(plantelesHigienesCSV);

    await queryInterface.bulkInsert(PLANTEL_HIGIENE_TABLE, plantelesHigienesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PLANTEL_HIGIENE_TABLE, null, {});
  },
};
