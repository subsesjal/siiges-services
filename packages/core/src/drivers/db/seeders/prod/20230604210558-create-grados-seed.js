const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { GRADO_TABLE } = require('../../models/grado');

const gradosCSV = path.join(__dirname, '../../CSVFiles/grados.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const gradosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(gradosCSV);

    return queryInterface.bulkInsert(GRADO_TABLE, gradosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(GRADO_TABLE, null, {});
  },
};
