const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { HIGIENE_TABLE } = require('../models/higiene');

const higienesCSV = path.join(__dirname, '../CSVFiles/higienes.csv');

module.exports = {
  async up(queryInterface) {
    const higienesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(higienesCSV);

    await queryInterface.bulkInsert(HIGIENE_TABLE, higienesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(HIGIENE_TABLE, null, {});
  },
};
