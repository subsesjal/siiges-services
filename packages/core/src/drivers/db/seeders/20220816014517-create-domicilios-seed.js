const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { DOMICILIO_TABLE } = require('../models/domicilio');

const domiciliosCSV = path.join(__dirname, '../CSVFiles/domicilios.csv');

module.exports = {
  async up(queryInterface) {
    const domiciliosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(domiciliosCSV);

    await queryInterface.bulkInsert(DOMICILIO_TABLE, domiciliosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(DOMICILIO_TABLE, null, {});
  },
};
