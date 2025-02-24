const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { PLANTEL_EDIFICIO_NIVEL_TABLE } = require('../../models/plantelEdificioNivel');

const plantelsEdificiosNivelesCSV = path.join(__dirname, '../../CSVFiles/planteles_edificios_niveles.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const plantelsEdificiosNivelesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(plantelsEdificiosNivelesCSV);

    return queryInterface.bulkInsert(
      PLANTEL_EDIFICIO_NIVEL_TABLE,
      plantelsEdificiosNivelesJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PLANTEL_EDIFICIO_NIVEL_TABLE, null, {});
  },
};
