const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ASOCIACIONES_TABLE } = require('../models/asociaciones');

const asociacionesCSV = path.join(__dirname, '../CSVFiles/asociaciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const asociacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(asociacionesCSV);

    return queryInterface.bulkInsert(ASOCIACIONES_TABLE, asociacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ASOCIACIONES_TABLE, null, {});
  },
};
