const { Model, DataTypes, Sequelize } = require('sequelize');

const MODALIDAD_TABLE = 'Modalidades';

const ModalidadSchema = {
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

class Modalidad extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MODALIDAD_TABLE,
      modelName: 'Modalidad',
      timestamps: false,
    };
  }
}
module.exports = { MODALIDAD_TABLE, ModalidadSchema, Modalidad };
