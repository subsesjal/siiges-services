const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { USUARIO_TABLE } = require('../../models/usuario');

const usuariosCSV = path.join(__dirname, '../../CSVFiles/usuarios.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      // eslint-disable-next-line no-param-reassign
      queryInterface = queryInterface.context;
    }
    const usuariosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(usuariosCSV);

    return queryInterface.bulkInsert(USUARIO_TABLE, usuariosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(USUARIO_TABLE, null, {});
  },
};
