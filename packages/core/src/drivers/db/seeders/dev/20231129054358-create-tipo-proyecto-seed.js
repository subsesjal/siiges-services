const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_PROYECTO_TABLE } = require('../../models/tipoProyecto');

const tipoProyectoCSV = path.join(__dirname, '../../CSVFiles/tipo_proyectos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoProyectoJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoProyectoCSV);

    return queryInterface.bulkInsert(TIPO_PROYECTO_TABLE, tipoProyectoJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_PROYECTO_TABLE, null, {});
  },
};
