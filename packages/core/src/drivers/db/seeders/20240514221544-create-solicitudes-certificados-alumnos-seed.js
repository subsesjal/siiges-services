const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { SOLICITUDES_CERTIFICADOS_ALUMNOS_TABLE } = require('../models/solicitudesCertificadosAlumnos');

const solicitudesCertificadosAlumnosCSV = path.join(__dirname, '../CSVFiles/solicitudesCertificadosAlumnos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const solicitudesCertificadosAlumnosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(solicitudesCertificadosAlumnosCSV);

    return queryInterface.bulkInsert(
      SOLICITUDES_CERTIFICADOS_ALUMNOS_TABLE,
      solicitudesCertificadosAlumnosJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(SOLICITUDES_CERTIFICADOS_ALUMNOS_TABLE, null, {});
  },
};
