const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TRAYECTORIA_TABLE } = require('../models/trayectoria');

const trayectoriaCSV = path.join(__dirname, '../CSVFiles/trayectoria.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const TrayectoriaJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(trayectoriaCSV);

    return queryInterface
      .bulkInsert(TRAYECTORIA_TABLE, TrayectoriaJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TRAYECTORIA_TABLE, null, {});
  },
};
