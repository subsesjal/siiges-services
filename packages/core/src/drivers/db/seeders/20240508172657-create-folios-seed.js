const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { FOLIOS_TABLE } = require('../models/folios');

const tipoRecursoPresupuestoCSV = path.join(__dirname, '../CSVFiles/folios.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const FoliosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoRecursoPresupuestoCSV);

    return queryInterface
      .bulkInsert(FOLIOS_TABLE, FoliosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(FOLIOS_TABLE, null, {});
  },
};
