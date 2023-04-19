const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { ESTATUS_INSPECCIONES_TABLE } = require('../models/estatusInspeccion');

const estatusinspeccionCSV = path.join(__dirname, '../CSVFiles/estatus_inspeccion.csv');

module.exports = {
  async up(queryInterface) {
    const estatusinspeccionJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusinspeccionCSV);

    await queryInterface.bulkInsert(ESTATUS_INSPECCIONES_TABLE, estatusinspeccionJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_INSPECCIONES_TABLE, null, {});
  },
};
