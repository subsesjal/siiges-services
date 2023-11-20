const { Model, DataTypes, Sequelize } = require('sequelize');

const PERIODO_TABLE = 'periodos';

const PeriodoSchema = {
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

class Periodo extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERIODO_TABLE,
      modelName: 'Periodo',
      timestamps: false,
    };
  }
}

module.exports = { PERIODO_TABLE, PeriodoSchema, Periodo };
