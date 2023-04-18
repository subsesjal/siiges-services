const csvToJson = require('convert-csv-to-json');
const path = require('path');

const { INSPECCIONES_CATEGORIAS_TABLE } = require('../models/inspeccionCategorias');

const inspeccioncategoriaCSV = path.join(__dirname, '../CSVFiles/inspeccion_categoria.csv');

module.exports = {
  async up(queryInterface) {
    const inspeccioncategoriaJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccioncategoriaCSV);

    await queryInterface.bulkInsert(INSPECCIONES_CATEGORIAS_TABLE, inspeccioncategoriaJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCIONES_CATEGORIAS_TABLE, null, {});
  },
};
