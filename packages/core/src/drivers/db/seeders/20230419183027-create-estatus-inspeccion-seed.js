const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { ESTATUS_INSPECCION_TABLE } = require('../models/estatusInspeccion');

const estatusinspeccionCSV = path.join(__dirname, '../CSVFiles/estatus_inspecciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusinspeccionJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusinspeccionCSV);

    return queryInterface.bulkInsert(ESTATUS_INSPECCION_TABLE, estatusinspeccionJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_INSPECCION_TABLE, null, {});
  },
};
