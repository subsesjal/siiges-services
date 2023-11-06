const { Sequelize, Model, DataTypes } = require('sequelize');

const TIPO_VALIDACIONES_TABLE = 'tipo_validaciones';

const TipoValidacionesSchema = {
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

class TipoValidaciones extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_VALIDACIONES_TABLE,
      modelName: 'TipoValidaciones',
      timestamps: false,
    };
  }
}

module.exports = {
  TIPO_VALIDACIONES_TABLE,
  TipoValidacionesSchema,
  TipoValidaciones,
};
