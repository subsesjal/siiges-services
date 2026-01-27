const { TOKEN_EXTERNO_TABLE, TokenExternoSchema } = require('../models/tokenExterno');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(TOKEN_EXTERNO_TABLE, TokenExternoSchema);
    
    // Agregar índice único compuesto para servicio y activo
    await queryInterface.addIndex(TOKEN_EXTERNO_TABLE, ['servicio', 'activo'], {
      unique: true,
      name: 'unique_servicio_activo',
      where: {
        deleted_at: null,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(TOKEN_EXTERNO_TABLE);
  },
};
