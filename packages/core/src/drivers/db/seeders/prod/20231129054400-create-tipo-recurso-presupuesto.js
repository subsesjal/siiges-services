const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_RECURSO_PRESUPUESTO_TABLE } = require('../../models/tipoRecursoPresupuesto');

const tipoRecursoPresupuestoCSV = path.join(__dirname, '../../CSVFiles/tipo_recurso_presupuestos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoRecursoPresupuestoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoRecursoPresupuestoCSV);

    return queryInterface
      .bulkInsert(TIPO_RECURSO_PRESUPUESTO_TABLE, tipoRecursoPresupuestoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_RECURSO_PRESUPUESTO_TABLE, null, {});
  },
};
