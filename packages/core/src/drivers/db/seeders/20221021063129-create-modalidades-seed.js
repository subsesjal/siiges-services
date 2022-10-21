const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { MODALIDAD_TABLE } = require('../models/modalidad');

const modalidadesCSV = path.join(__dirname, '../CSVFiles/modalidades.csv');

module.exports = {
  async up(queryInterface) {
    const modalidadesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(modalidadesCSV);

    await queryInterface.bulkInsert(MODALIDAD_TABLE, modalidadesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(MODALIDAD_TABLE, null, {});
  },
};
