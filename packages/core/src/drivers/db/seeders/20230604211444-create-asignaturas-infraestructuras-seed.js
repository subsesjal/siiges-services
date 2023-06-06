const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { ASIGNATURA_INFRAESTRUCTURA_TABLE } = require('../models/asignaturaInfraestructura');

const asignaturasInfraestructurasCSV = path.join(__dirname, '../CSVFiles/asignaturas_infraestructuras.csv');

module.exports = {
  async up(queryInterface) {
    const asignaturasInfraestructurasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(asignaturasInfraestructurasCSV);

    await queryInterface.bulkInsert(
      ASIGNATURA_INFRAESTRUCTURA_TABLE,
      asignaturasInfraestructurasJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ASIGNATURA_INFRAESTRUCTURA_TABLE, null, {});
  },
};
