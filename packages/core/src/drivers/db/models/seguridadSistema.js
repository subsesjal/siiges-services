const { Model, DataTypes, Sequelize } = require('sequelize');

const SEGURIDAD_SISTEMA_TABLE = 'seguridad_sistemas';

const SeguridadSistemaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
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

class SeguridadSistema extends Model {
  static associate(models) {
    this.hasMany(models.PlantelSeguridadSistema, {
      as: 'plantelSeguridadSistema',
      foreignKey: 'seguridadSistemaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SEGURIDAD_SISTEMA_TABLE,
      modelName: 'SeguridadSistema',
      timestamps: false,
    };
  }
}

module.exports = { SEGURIDAD_SISTEMA_TABLE, SeguridadSistemaSchema, SeguridadSistema };
