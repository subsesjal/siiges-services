const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { PROGRAMA_TURNO_TABLE } = require('../models/programaTurno');

const programasTurnosCSV = path.join(__dirname, '../CSVFiles/programas_turnos.csv');

module.exports = {
  async up(queryInterface) {
    const programasTurnosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(programasTurnosCSV);

    await queryInterface.bulkInsert(PROGRAMA_TURNO_TABLE, programasTurnosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PROGRAMA_TURNO_TABLE, null, {});
  },
};
