const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { FOJA_TABLE } = require('../models/foja');

const fojaCSV = path.join(__dirname, '../CSVFiles/foja.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const FojaJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(fojaCSV);

    return queryInterface.bulkInsert(FOJA_TABLE, FojaJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(FOJA_TABLE, null, {});
  },
};
