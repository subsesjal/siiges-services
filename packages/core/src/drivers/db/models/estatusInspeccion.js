const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_INSPECCION_TABLE = 'estatus_inspecciones';

const EstatusInspeccionSchema = {
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

class EstatusInspeccion extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_INSPECCION_TABLE,
      modelName: 'EstatusInspeccion',
      timestamps: false,
    };
  }
}

module.exports = { ESTATUS_INSPECCION_TABLE, EstatusInspeccionSchema, EstatusInspeccion };
