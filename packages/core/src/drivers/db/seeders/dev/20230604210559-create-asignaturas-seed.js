const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ASIGNATURA_TABLE } = require('../../models/asignatura');

const asignaturasCSV = path.join(__dirname, '../../CSVFiles/asignaturas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const asignaturasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(asignaturasCSV);

    return queryInterface.bulkInsert(ASIGNATURA_TABLE, asignaturasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ASIGNATURA_TABLE, null, {});
  },
};
