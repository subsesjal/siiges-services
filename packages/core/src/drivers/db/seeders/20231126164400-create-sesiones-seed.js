const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SESION_TABLE } = require('../models/sesion');

const sesionesCSV = path.join(__dirname, '../CSVFiles/sesiones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const sesionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(sesionesCSV);

    return queryInterface.bulkInsert(SESION_TABLE, sesionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SESION_TABLE, null, {});
  },
};
