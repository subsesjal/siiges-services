const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ALUMNO_GRUPO_TABLE } = require('../models/alumnoGrupo');

const alumnosGruposCSV = path.join(__dirname, '../CSVFiles/alumnos_grupos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const alumnosGruposJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(alumnosGruposCSV);

    return queryInterface.bulkInsert(ALUMNO_GRUPO_TABLE, alumnosGruposJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ALUMNO_GRUPO_TABLE, null, {});
  },
};
