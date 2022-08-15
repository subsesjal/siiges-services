const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { MUNICIPIO_TABLE } = require('../models/municipio');

const municipiosCSV = path.join(__dirname, '../CSVFiles/municipios.csv');

module.exports = {
  async up(queryInterface) {
    const municipiosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(municipiosCSV);

    await queryInterface.bulkInsert(MUNICIPIO_TABLE, municipiosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(MUNICIPIO_TABLE, null, {});
  },
};
