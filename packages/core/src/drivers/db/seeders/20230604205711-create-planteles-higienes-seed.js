const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PLANTEL_HIGIENE_TABLE } = require('../models/plantelHigiene');

const plantelesHigienesCSV = path.join(__dirname, '../CSVFiles/planteles_higienes.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const plantelesHigienesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(plantelesHigienesCSV);

    return queryInterface.bulkInsert(PLANTEL_HIGIENE_TABLE, plantelesHigienesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PLANTEL_HIGIENE_TABLE, null, {});
  },
};
