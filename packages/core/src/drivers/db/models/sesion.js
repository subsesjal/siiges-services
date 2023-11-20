const { Model, DataTypes, Sequelize } = require('sequelize');

const SESION_TABLE = 'sesiones';

const SesionSchema = {
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

class Sesion extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: SESION_TABLE,
      modelName: 'Sesion',
      timestamps: false,
    };
  }
}

module.exports = { SESION_TABLE, SesionSchema, Sesion };
