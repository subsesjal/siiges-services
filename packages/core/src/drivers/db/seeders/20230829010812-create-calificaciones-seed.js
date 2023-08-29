const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { CALIFICACIONES_TABLE } = require('../models/calificaciones');

const calificacionesCSV = path.join(__dirname, '../CSVFiles/calificaciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const calificacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(calificacionesCSV);

    return queryInterface.bulkInsert(CALIFICACIONES_TABLE, calificacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CALIFICACIONES_TABLE, null, {});
  },
};

