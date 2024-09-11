const { Model, DataTypes, Sequelize } = require('sequelize');

const DOCUMENTO_TABLE = 'documentos';

const DocumentoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoEntidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_entidad',
  },
  entidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'entidad_id',
  },
  tipoDocumento: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_documento',
  },
  nombre: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  archivo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class Documento extends Model {
  static associate() {
    // Define associations here if needed
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCUMENTO_TABLE,
      modelName: 'Documento',
      timestamps: false,
    };
  }
}

module.exports = { DOCUMENTO_TABLE, DocumentoSchema, Documento };
