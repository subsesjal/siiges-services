const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { GRUPO_TABLE } = require('../../models/grupo');

const gruposCSV = path.join(__dirname, '../../CSVFiles/grupos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const gruposJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(gruposCSV);

    return queryInterface.bulkInsert(GRUPO_TABLE, gruposJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(GRUPO_TABLE, null, {});
  },
};
