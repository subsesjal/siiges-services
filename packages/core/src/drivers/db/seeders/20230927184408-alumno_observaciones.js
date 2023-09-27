const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ALUMNO_OBSERVACIONES_TABLE } = require('../models/alumnoObservaciones');

const alumnoObservacionesCSV = path.join(__dirname, '../CSVFiles/alumno_observaciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const alumnoObservacionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(alumnoObservacionesCSV);

    return queryInterface.bulkInsert(ALUMNO_OBSERVACIONES_TABLE, alumnoObservacionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ALUMNO_OBSERVACIONES_TABLE, null, {});
  },
};
