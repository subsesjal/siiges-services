const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { LIBRO_TABLE } = require('../models/libro');

const libroCSV = path.join(__dirname, '../CSVFiles/libro.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const LibroJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(libroCSV);

    return queryInterface.bulkInsert(LIBRO_TABLE, LibroJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(LIBRO_TABLE, null, {});
  },
};
