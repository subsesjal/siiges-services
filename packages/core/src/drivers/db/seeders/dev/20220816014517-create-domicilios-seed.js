const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { DOMICILIO_TABLE } = require('../../models/domicilio');

const domiciliosCSV = path.join(__dirname, '../../CSVFiles/domicilios.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const domiciliosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(domiciliosCSV);

    return queryInterface.bulkInsert(DOMICILIO_TABLE, domiciliosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(DOMICILIO_TABLE, null, {});
  },
};
