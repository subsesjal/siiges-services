const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INFRAESTRUCTURA_PROGRAMA_TABLE } = require('../models/infraestructuraPrograma');

const infraestructurasProgramasCSV = path.join(__dirname, '../CSVFiles/infraestructuras_programas.csv');

module.exports = {
  async up(queryInterface) {
    const infraestructurasProgramasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(infraestructurasProgramasCSV);

    await queryInterface.bulkInsert(
      INFRAESTRUCTURA_PROGRAMA_TABLE,
      infraestructurasProgramasJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INFRAESTRUCTURA_PROGRAMA_TABLE, null, {});
  },
};
