const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { RATIFICACION_NOMBRE_TABLE } = require('../models/ratificacionNombre');

const ratificacionNombresCSV = path.join(__dirname, '../CSVFiles/ratificacion_nombres.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const ratificacionNombresJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(ratificacionNombresCSV);

    return queryInterface.bulkInsert(RATIFICACION_NOMBRE_TABLE, ratificacionNombresJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(RATIFICACION_NOMBRE_TABLE, null, {});
  },
};
