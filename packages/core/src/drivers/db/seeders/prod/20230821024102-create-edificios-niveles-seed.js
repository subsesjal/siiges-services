const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { EDIFICIO_NIVEL_TABLE } = require('../../models/edificioNivel');

const edificiosNivelesCSV = path.join(__dirname, '../../CSVFiles/edificios_niveles.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const edificiosNivelesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(edificiosNivelesCSV);

    return queryInterface.bulkInsert(EDIFICIO_NIVEL_TABLE, edificiosNivelesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(EDIFICIO_NIVEL_TABLE, null, {});
  },
};
