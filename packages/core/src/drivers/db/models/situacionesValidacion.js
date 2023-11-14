const { Sequelize, Model, DataTypes } = require('sequelize');

const SITUACIONES_VALIDACION_TABLE = 'situaciones_validacion';

const SituacionesValidacionSchema = {
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

class SituacionesValidacion extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SITUACIONES_VALIDACION_TABLE,
      modelName: 'SituacionesValidacion',
      timestamps: false,
    };
  }
}

module.exports = {
  SITUACIONES_VALIDACION_TABLE,
  SituacionesValidacionSchema,
  SituacionesValidacion,
};
