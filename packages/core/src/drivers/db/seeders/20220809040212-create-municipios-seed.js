const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { MUNICIPIO_TABLE } = require('../models/municipio');

const municipiosCSV = path.join(__dirname, '../CSVFiles/municipios.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const municipiosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(municipiosCSV);

    return queryInterface.bulkInsert(MUNICIPIO_TABLE, municipiosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(MUNICIPIO_TABLE, null, {});
  },
};
