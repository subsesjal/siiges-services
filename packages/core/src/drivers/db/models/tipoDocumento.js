const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_DOCUMENTO_TABLE = 'tipo_documentos';

const TipoDocumentoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class TipoDocumento extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_DOCUMENTO_TABLE,
      modelName: 'TipoDocumento',
      timestamps: false,
    };
  }
}
module.exports = { TIPO_DOCUMENTO_TABLE, TipoDocumentoSchema, TipoDocumento };
