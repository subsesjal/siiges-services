const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ESTATUS_ALUMNO_BECA_TABLE } = require('../models/estatusAlumnosBecas');

const estatusAlumnosBecasCSV = path.join(__dirname, '../CSVFiles/estatus_alumnos_becas.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const estatusAlumnosBecasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(estatusAlumnosBecasCSV);

    return queryInterface
      .bulkInsert(ESTATUS_ALUMNO_BECA_TABLE, estatusAlumnosBecasJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ESTATUS_ALUMNO_BECA_TABLE, null, {});
  },
};
