const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_INSTALACION_TABLE = 'tipo_instalaciones';

const TipoInstalacionSchema = {
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

class TipoInstalacion extends Model {
  static associate(models) {
    this.hasOne(models.Infraestructura, {
      as: 'infraestructura',
      foreignKey: 'tipoInstalacionId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_INSTALACION_TABLE,
      modelName: 'TipoInstalacion',
      timestamps: false,
    };
  }
}

module.exports = { TIPO_INSTALACION_TABLE, TipoInstalacionSchema, TipoInstalacion };
