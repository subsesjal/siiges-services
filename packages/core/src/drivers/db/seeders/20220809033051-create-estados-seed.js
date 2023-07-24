const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { ESTADO_TABLE } = require('../models/estado');

const estadosCSV = path.join(__dirname, '../CSVFiles/estados.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estadosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estadosCSV);

    return queryInterface.bulkInsert(ESTADO_TABLE, estadosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTADO_TABLE, null, {});
  },
};
