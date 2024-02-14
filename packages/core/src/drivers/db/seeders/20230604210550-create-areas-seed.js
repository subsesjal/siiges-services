const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { AREA_TABLE } = require('../models/area');

const areasCSV = path.join(__dirname, '../CSVFiles/areas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const areasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(areasCSV);

    return queryInterface.bulkInsert(AREA_TABLE, areasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(AREA_TABLE, null, {});
  },
};
