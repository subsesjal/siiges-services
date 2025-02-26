const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { PROGRAMA_TABLE } = require('../../models/programa');

const programasCSV = path.join(__dirname, '../../CSVFiles/programas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const programasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(programasCSV);

    return queryInterface.bulkInsert(PROGRAMA_TABLE, programasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PROGRAMA_TABLE, null, {});
  },
};
