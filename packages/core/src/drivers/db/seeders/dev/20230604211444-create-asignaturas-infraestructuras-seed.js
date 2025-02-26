const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ASIGNATURA_INFRAESTRUCTURA_TABLE } = require('../../models/asignaturaInfraestructura');

const asignaturasInfraestructurasCSV = path.join(__dirname, '../../CSVFiles/asignaturas_infraestructuras.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const asignaturasInfraestructurasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(asignaturasInfraestructurasCSV);

    return queryInterface.bulkInsert(
      ASIGNATURA_INFRAESTRUCTURA_TABLE,
      asignaturasInfraestructurasJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ASIGNATURA_INFRAESTRUCTURA_TABLE, null, {});
  },
};
