const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { NIVEL_TABLE } = require('../models/nivel');

const nivelesCSV = path.join(__dirname, '../CSVFiles/niveles.csv');

module.exports = {
  async up(queryInterface) {
    const nivelesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(nivelesCSV);

    await queryInterface.bulkInsert(NIVEL_TABLE, nivelesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(NIVEL_TABLE, null, {});
  },
};
