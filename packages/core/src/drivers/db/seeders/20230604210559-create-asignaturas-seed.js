const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { ASIGNATURA_TABLE } = require('../models/asignatura');

const asignaturasCSV = path.join(__dirname, '../CSVFiles/asignaturas.csv');

module.exports = {
  async up(queryInterface) {
    const asignaturasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(asignaturasCSV);

    await queryInterface.bulkInsert(ASIGNATURA_TABLE, asignaturasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ASIGNATURA_TABLE, null, {});
  },
};
