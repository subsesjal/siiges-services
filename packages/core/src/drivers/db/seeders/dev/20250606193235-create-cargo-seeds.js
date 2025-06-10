const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { CARGO_TABLE } = require('../../models/cargo');

const cargoCSV = path.join(__dirname, '../../CSVFiles/cargos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const cargoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(cargoCSV);

    return queryInterface.bulkInsert(CARGO_TABLE, cargoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CARGO_TABLE, null, {});
  },
};
