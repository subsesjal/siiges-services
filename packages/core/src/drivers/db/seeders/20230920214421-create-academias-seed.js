const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ACADEMIAS_TABLE } = require('../models/academias');

const academiasCSV = path.join(__dirname, '../CSVFiles/academias.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const academiasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(academiasCSV);

    return queryInterface.bulkInsert(ACADEMIAS_TABLE, academiasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ACADEMIAS_TABLE, null, {});
  },
};
