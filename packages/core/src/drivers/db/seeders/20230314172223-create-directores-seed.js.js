const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { DIRECTOR_TABLE } = require('../models/director');

const directoresCSV = path.join(__dirname, '../CSVFiles/directores.csv');

module.exports = {
  async up(queryInterface) {
    const directoresJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(directoresCSV);

    await queryInterface.bulkInsert(DIRECTOR_TABLE, directoresJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(DIRECTOR_TABLE, null, {});
  },
};
