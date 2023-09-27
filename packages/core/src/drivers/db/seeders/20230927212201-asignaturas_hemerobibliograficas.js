const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ASIGNATURAS_HEMEROBIBLIOGRAFICAS_TABLE } = require('../models/asignaturasHemerobibliograficas');

const asignaturasHemerobibliograficasCSV = path.join(
  __dirname,
  '../CSVFiles/asignaturas_hemerobibliograficas.csv',
);

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const asignaturasHemerobibliograficasJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(asignaturasHemerobibliograficasCSV);

    return queryInterface.bulkInsert(
      ASIGNATURAS_HEMEROBIBLIOGRAFICAS_TABLE,
      asignaturasHemerobibliograficasJson,
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ASIGNATURAS_HEMEROBIBLIOGRAFICAS_TABLE, null, {});
  },
};
