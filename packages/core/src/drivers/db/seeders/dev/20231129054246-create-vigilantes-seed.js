const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { VIGILANTE_TABLE } = require('../../models/vigilante');

const vigilantesCSV = path.join(__dirname, '../../CSVFiles/vigilantes.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const vigilantesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(vigilantesCSV);

    return queryInterface.bulkInsert(VIGILANTE_TABLE, vigilantesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(VIGILANTE_TABLE, null, {});
  },
};
