const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SITUACION_TABLE } = require('../models/situacion');

const situacionesCSV = path.join(__dirname, '../CSVFiles/situaciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const situacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(situacionesCSV);

    return queryInterface.bulkInsert(SITUACION_TABLE, situacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SITUACION_TABLE, null, {});
  },
};
