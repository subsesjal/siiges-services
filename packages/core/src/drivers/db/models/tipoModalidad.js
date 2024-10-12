const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_MODALIDAD_TABLE = 'tipo_modalidades';

const TipoModalidadSchema = {
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

class TipoModalidad extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_MODALIDAD_TABLE,
      modelName: 'TipoModalidad',
      timestamps: false,
    };
  }
}
module.exports = { TIPO_MODALIDAD_TABLE, TipoModalidadSchema, TipoModalidad };
