const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { CUMPLIMIENTO_TABLE } = require('../models/cumplimiento');

const cumplimientosCSV = path.join(__dirname, '../CSVFiles/cumplimientos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const cumplimientosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(cumplimientosCSV);

    return queryInterface.bulkInsert(CUMPLIMIENTO_TABLE, cumplimientosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CUMPLIMIENTO_TABLE, null, {});
  },
};
