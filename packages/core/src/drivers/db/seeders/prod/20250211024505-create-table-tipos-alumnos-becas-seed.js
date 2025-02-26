const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_ALUMNO_BECA_TABLE } = require('../../models/tipoAlumnoBeca');

const tipoAlumnoBecaCSV = path.join(__dirname, '../../CSVFiles/tipo_alumnos_becas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoAlumnoBecaJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoAlumnoBecaCSV);

    return queryInterface
      .bulkInsert(TIPO_ALUMNO_BECA_TABLE, tipoAlumnoBecaJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_ALUMNO_BECA_TABLE, null, {});
  },
};
