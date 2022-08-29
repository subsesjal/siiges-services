const { Model, DataTypes, Sequelize } = require('sequelize');

const FILE_TABLE = 'files';

const FileSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoEntidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_entidad_id',
  },
  entidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'entidad_id',
  },
  tipoDocumentoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_documento_id',
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ubicacion: {
    allowNull: false,
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

class File extends Model {
  static associate() {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FILE_TABLE,
      modelName: 'File',
      timestamps: false,
    };
  }
}

module.exports = { FILE_TABLE, FileSchema, File };
