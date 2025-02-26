const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { PLANTEL_SEGURIDAD_SISTEMA_TABLE } = require('../../models/plantelSeguridadSistema');

const plantelesSeguridadSistemasCSV = path.join(__dirname, '../../CSVFiles/planteles_seguridad_sistemas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const plantelesSeguridadSistemasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(plantelesSeguridadSistemasCSV);

    return queryInterface.bulkInsert(
      PLANTEL_SEGURIDAD_SISTEMA_TABLE,
      plantelesSeguridadSistemasJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PLANTEL_SEGURIDAD_SISTEMA_TABLE, null, {});
  },
};
