const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { HIGIENE_TABLE } = require('../models/higiene');

const higieneCSV = path.join(__dirname, '../CSVFiles/higienes.csv');

module.exports = {
  async up(queryInterface) {
    const higieneJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(higieneCSV);

    await queryInterface.bulkInsert(HIGIENE_TABLE, higieneJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(HIGIENE_TABLE, null, {});
  },
};
