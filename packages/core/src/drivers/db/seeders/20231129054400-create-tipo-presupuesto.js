const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_PRESUPUESTO_TABLE } = require('../models/tipoPresupuesto');

const tipoPresupuestoCSV = path.join(__dirname, '../CSVFiles/tipo_presupuestos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoPresupuestoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoPresupuestoCSV);

    return queryInterface.bulkInsert(TIPO_PRESUPUESTO_TABLE, tipoPresupuestoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_PRESUPUESTO_TABLE, null, {});
  },
};
