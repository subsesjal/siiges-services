const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { VIGILANCIA_TABLE } = require('../models/vigilancia');

const vigilanciasCSV = path.join(__dirname, '../CSVFiles/vigilancias.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const vigilanciasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(vigilanciasCSV);

    return queryInterface.bulkInsert(VIGILANCIA_TABLE, vigilanciasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(VIGILANCIA_TABLE, null, {});
  },
};
