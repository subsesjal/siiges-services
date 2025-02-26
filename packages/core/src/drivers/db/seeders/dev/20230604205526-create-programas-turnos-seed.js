const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { PROGRAMA_TURNO_TABLE } = require('../../models/programaTurno');

const programasTurnosCSV = path.join(__dirname, '../../CSVFiles/programas_turnos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const programasTurnosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(programasTurnosCSV);

    return queryInterface.bulkInsert(PROGRAMA_TURNO_TABLE, programasTurnosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PROGRAMA_TURNO_TABLE, null, {});
  },
};
