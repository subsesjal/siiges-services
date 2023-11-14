const { Sequelize, Model, DataTypes } = require('sequelize');

const TIPO_VALIDACION_TABLE = 'tipo_validaciones';

const TipoValidacionSchema = {
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

class TipoValidacion extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_VALIDACION_TABLE,
      modelName: 'TipoValidacion',
      timestamps: false,
    };
  }
}

module.exports = {
  TIPO_VALIDACION_TABLE,
  TipoValidacionSchema,
  TipoValidacion,
};
