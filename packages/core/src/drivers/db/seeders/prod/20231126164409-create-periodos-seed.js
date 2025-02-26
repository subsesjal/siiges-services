const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { PERIODO_TABLE } = require('../../models/periodo');

const periodosCSV = path.join(__dirname, '../../CSVFiles/periodos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const periodosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(periodosCSV);

    return queryInterface.bulkInsert(PERIODO_TABLE, periodosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PERIODO_TABLE, null, {});
  },
};
