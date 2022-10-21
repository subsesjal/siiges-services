const { Model, DataTypes, Sequelize } = require('sequelize');

const CICLO_TABLE = 'ciclos';

const CicloSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
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

class Ciclo extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CICLO_TABLE,
      modelName: 'Ciclo',
      timestamps: false,
    };
  }
}

module.exports = { CICLO_TABLE, CicloSchema, Ciclo };
