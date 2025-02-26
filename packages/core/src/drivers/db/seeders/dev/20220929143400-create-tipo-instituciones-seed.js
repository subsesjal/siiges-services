const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { TIPO_INSTITUCION_TABLE } = require('../../models/tipoInstitucion');

const tipoInstitucionesCSV = path.join(__dirname, '../../CSVFiles/tipo_instituciones.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const tipoInstitucionesJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(tipoInstitucionesCSV);

    return queryInterface.bulkInsert(TIPO_INSTITUCION_TABLE, tipoInstitucionesJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TIPO_INSTITUCION_TABLE, null, {});
  },
};
