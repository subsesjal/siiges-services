const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SITUACION_VALIDACION_TABLE } = require('../../models/situacionValidacion');

const situacionesValidacion = path.join(__dirname, '../../CSVFiles/situacion_validacion.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const situacionesValidacionJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(situacionesValidacion);

    return queryInterface.bulkInsert(SITUACION_VALIDACION_TABLE, situacionesValidacionJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SITUACION_VALIDACION_TABLE, null, {});
  },
};
