const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PLANTEL_TABLE } = require('../models/plantel');

const plantelesCSV = path.join(__dirname, '../CSVFiles/planteles.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const plantelesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(plantelesCSV);

    return queryInterface.bulkInsert(PLANTEL_TABLE, plantelesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PLANTEL_TABLE, null, {});
  },
};
