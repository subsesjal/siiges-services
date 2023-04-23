const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSPECCION_CATEGORIA_TABLE } = require('../models/inspeccionCategoria');

const inspeccionCategoriasCSV = path.join(__dirname, '../CSVFiles/inspeccion_categorias.csv');

module.exports = {
  async up(queryInterface) {
    const inspeccionCategoriasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionCategoriasCSV);

    await queryInterface.bulkInsert(INSPECCION_CATEGORIA_TABLE, inspeccionCategoriasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_CATEGORIA_TABLE, null, {});
  },
};
