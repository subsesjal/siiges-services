const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SITUACIONES_VALIDACION_TABLE } = require('../models/situacionesValidacion');

const situacionesValidacion = path.join(__dirname, '../CSVFiles/situacion_validacion.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const situacionesValidacionJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(situacionesValidacion);

    return queryInterface.bulkInsert(SITUACIONES_VALIDACION_TABLE, situacionesValidacionJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SITUACIONES_VALIDACION_TABLE, null, {});
  },
};
