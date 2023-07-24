const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { TURNO_TABLE } = require('../models/turno');

const nivelesCSV = path.join(__dirname, '../CSVFiles/turnos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const nivelesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(nivelesCSV);

    return queryInterface.bulkInsert(TURNO_TABLE, nivelesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TURNO_TABLE, null, {});
  },
};
