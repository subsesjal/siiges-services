const { Model, DataTypes, Sequelize } = require('sequelize');

const CARGO_TABLE = 'cargos';

const CargoSchema = {
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

class Cargo extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARGO_TABLE,
      modelName: 'Cargo',
      timestamps: false,
    };
  }
}

module.exports = {
  CARGO_TABLE,
  CargoSchema,
  Cargo,
};
