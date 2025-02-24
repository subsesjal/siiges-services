const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { NIVEL_TABLE } = require('../../models/nivel');

const nivelesCSV = path.join(__dirname, '../../CSVFiles/niveles.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const nivelesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(nivelesCSV);

    return queryInterface.bulkInsert(NIVEL_TABLE, nivelesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(NIVEL_TABLE, null, {});
  },
};
