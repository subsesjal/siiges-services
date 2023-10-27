const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { DILIGENCIA_TABLE } = require('../models/diligencia');

const diligenciasCSV = path.join(__dirname, '../CSVFiles/diligencias.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const diligenciasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(diligenciasCSV);

    return queryInterface.bulkInsert(DILIGENCIA_TABLE, diligenciasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(DILIGENCIA_TABLE, null, {});
  },
};
