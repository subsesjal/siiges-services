const { Model, DataTypes, Sequelize } = require('sequelize');

const DIMENSIONES_SERVICIO_SOCIAL_TABLE = 'dimensiones_servicio_social';

const DimensionesServicioSocialSchema = {
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
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class DimensionesServicioSocial extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DIMENSIONES_SERVICIO_SOCIAL_TABLE,
      modelName: 'DimensionesServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  DIMENSIONES_SERVICIO_SOCIAL_TABLE,
  DimensionesServicioSocialSchema,
  DimensionesServicioSocial,
};
