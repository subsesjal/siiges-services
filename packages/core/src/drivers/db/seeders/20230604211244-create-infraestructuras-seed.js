const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { INFRAESTRUCTURA_TABLE } = require('../models/infraestructura');

const infraestructurasCSV = path.join(__dirname, '../CSVFiles/infraestructuras.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const infraestructurasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(infraestructurasCSV);

    return queryInterface.bulkInsert(INFRAESTRUCTURA_TABLE, infraestructurasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INFRAESTRUCTURA_TABLE, null, {});
  },
};
