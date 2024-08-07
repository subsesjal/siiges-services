const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_DOCUMENTO_TABLE } = require('./tipoDocumento');

const LIBRO_TABLE = 'libros';

const LibroSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoDocumentoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_documento_id',
    references: {
      model: TIPO_DOCUMENTO_TABLE,
      key: 'id',
    },
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

class Libro extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LIBRO_TABLE,
      modelName: 'Libro',
      timestamps: false,
    };
  }
}
module.exports = {
  LIBRO_TABLE,
  LibroSchema,
  Libro,
};
