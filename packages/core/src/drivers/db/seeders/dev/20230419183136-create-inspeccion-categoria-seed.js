const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { INSPECCION_CATEGORIA_TABLE } = require('../../models/inspeccionCategoria');

const inspeccionCategoriasCSV = path.join(__dirname, '../../CSVFiles/inspeccion_categorias.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const inspeccionCategoriasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(inspeccionCategoriasCSV);

    return queryInterface.bulkInsert(INSPECCION_CATEGORIA_TABLE, inspeccionCategoriasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(INSPECCION_CATEGORIA_TABLE, null, {});
  },
};
