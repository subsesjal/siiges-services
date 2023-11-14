const { Sequelize, Model, DataTypes } = require('sequelize');

const SITUACION_VALIDACION_TABLE = 'situaciones_validacion';

const SituacionValidacionSchema = {
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

class SituacionValidacion extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SITUACION_VALIDACION_TABLE,
      modelName: 'SituacionValidacion',
      timestamps: false,
    };
  }
}

module.exports = {
  SITUACION_VALIDACION_TABLE,
  SituacionValidacionSchema,
  SituacionValidacion,
};
