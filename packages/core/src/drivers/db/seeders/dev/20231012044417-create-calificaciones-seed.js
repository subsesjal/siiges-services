const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { CALIFICACION_TABLE } = require('../../models/calificacion');

const calificacionesCSV = path.join(__dirname, '../../CSVFiles/calificaciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const calificacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(calificacionesCSV);

    return queryInterface.bulkInsert(CALIFICACION_TABLE, calificacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(CALIFICACION_TABLE, null, {});
  },
};
