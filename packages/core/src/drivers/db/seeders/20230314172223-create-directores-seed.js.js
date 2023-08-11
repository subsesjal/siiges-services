const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { DIRECTOR_TABLE } = require('../models/director');

const directoresCSV = path.join(__dirname, '../CSVFiles/directores.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const directoresJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(directoresCSV);

    return queryInterface.bulkInsert(DIRECTOR_TABLE, directoresJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(DIRECTOR_TABLE, null, {});
  },
};
