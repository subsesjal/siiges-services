const { Model, DataTypes, Sequelize } = require('sequelize');

const LIBRO_TABLE = 'libros';

const LibroSchema = {
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
