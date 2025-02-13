const { Model, DataTypes, Sequelize } = require('sequelize');

const SECTORES_SERVICIO_SOCIAL_TABLE = 'sectores_servicio_social';

const SectoresServicioSocialSchema = {
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

class SectoresServicioSocial extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SECTORES_SERVICIO_SOCIAL_TABLE,
      modelName: 'SectoresServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  SECTORES_SERVICIO_SOCIAL_TABLE,
  SectoresServicioSocialSchema,
  SectoresServicioSocial,
};
