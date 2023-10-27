const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { NOTIFICACION_TABLE } = require('../models/notificacion');

const notificacionesCSV = path.join(__dirname, '../CSVFiles/notificaciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const notificacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(notificacionesCSV);

    return queryInterface.bulkInsert(NOTIFICACION_TABLE, notificacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(NOTIFICACION_TABLE, null, {});
  },
};
