const { Model, DataTypes, Sequelize } = require('sequelize');

const ASOCIACIONES_TABLE = 'asociaciones';

const AsociacionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  evaluador_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  tipo_membresia: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: null,
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

class Asociaciones extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASOCIACIONES_TABLE,
      modelName: 'Asociaciones',
      timestamps: false,
    };
  }
}

module.exports = { ASOCIACIONES_TABLE, AsociacionesSchema, Asociaciones };
