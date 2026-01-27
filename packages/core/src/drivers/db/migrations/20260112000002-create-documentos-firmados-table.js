const { DOCUMENTO_FIRMADO_TABLE, DocumentoFirmadoSchema } = require('../models/documentoFirmado');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(DOCUMENTO_FIRMADO_TABLE, DocumentoFirmadoSchema);
    
    // Agregar índices para optimizar búsquedas
    await queryInterface.addIndex(DOCUMENTO_FIRMADO_TABLE, ['folio_validacion'], {
      name: 'idx_folio_validacion',
    });
    
    await queryInterface.addIndex(DOCUMENTO_FIRMADO_TABLE, ['solicitud_folio_id'], {
      name: 'idx_solicitud_folio',
    });
    
    await queryInterface.addIndex(DOCUMENTO_FIRMADO_TABLE, ['fecha_firmado'], {
      name: 'idx_fecha_firmado',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(DOCUMENTO_FIRMADO_TABLE);
  },
};
