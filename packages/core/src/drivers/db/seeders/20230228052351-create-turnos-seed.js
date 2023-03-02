const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { TURNO_TABLE } = require('../models/turno');

const nivelesCSV = path.join(__dirname, '../CSVFiles/turnos.csv');

module.exports = {
  async up(queryInterface) {
    const nivelesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(nivelesCSV);

    await queryInterface.bulkInsert(TURNO_TABLE, nivelesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TURNO_TABLE, null, {});
  },
};
